import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import {
  useAddBannerMutation,
  useGetBannerQuery,
  useUpdateBannerMutation,
} from "../../../../Redux/api/bannerApi";

export default function Banner() {
  const [images, setImages] = useState([]);

  const { data, isLoading } = useGetBannerQuery();
  let id = data?.data?._id;

  const [addBanner, { isLoading: addLoading }] = useAddBannerMutation();
  const [updateBanner, { isLoading: updateLoading }] =
    useUpdateBannerMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    let bg = images[0]?.file;

    if (!bg && !id)
      return Swal.fire("", "Background image is required!", "warning");

    const form = e.target;
    const title = form.title.value;
    const subTitle = form.subTitle.value;

    const formData = new FormData();
    formData.append("bg", bg);
    formData.append("title", title);
    formData.append("subTitle", subTitle);

    if (!id) {
      let res = await addBanner(formData);
      if (res?.data?.success) {
        toast.success("Banner add success");
        setImages([]);
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    } else {
      let res = await updateBanner({ id, formData });
      if (res?.data?.success) {
        toast.success("Banner update success");
        setImages([]);
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    }
  };

  if (isLoading) return "Loading...";

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Banner</h3>
      </div>

      <form onSubmit={handleAdd} className="p-4">
        <div className="mt-2">
          <p className="text-neutral-content">Title</p>
          <input
            type="text"
            name="title"
            required
            defaultValue={data?.data?.title}
          />
        </div>
        <div className="mt-2">
          <p className="text-neutral-content">Sub Title</p>
          <input
            type="text"
            name="subTitle"
            required
            defaultValue={data?.data?.subTitle}
          />
        </div>

        <div className="mt-2">
          <p>Image</p>
          <div>
            <ImageUploading
              value={images}
              onChange={(icn) => setImages(icn)}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <div
                  className="mt-2 border rounded border-dashed p-4"
                  {...dragProps}
                >
                  <div className="flex items-center gap-2">
                    <span
                      onClick={onImageUpload}
                      className="w-max px-4 py-1.5 rounded-2xl text-base-100 bg-primary cursor-pointer text-sm"
                    >
                      Choose Image
                    </span>

                    <p className="text-neutral-content">or Drop here</p>
                  </div>

                  <div className={`${images?.length > 0 && "mt-4"} `}>
                    {images?.map((img, index) => (
                      <div key={index} className="image-item relative">
                        <img src={img["data_url"]} alt="" className="w-40" />
                        <div
                          onClick={() => onImageRemove(index)}
                          className="w-7 h-7 bg-primary rounded-full flex justify-center items-center text-base-100 absolute top-0 right-0 cursor-pointer"
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>

            {data?.data?.bg && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/banner/${
                  data?.data?.bg
                }`}
                alt=""
                className="w-32 mt-4"
              />
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            disabled={updateLoading && "disabled"}
            className="primary_btn"
          >
            {updateLoading || addLoading ? "Loading" : id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}
