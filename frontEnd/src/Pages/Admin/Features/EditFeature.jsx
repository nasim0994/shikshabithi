import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleFeatureQuery,
  useUpdateFeatureMutation,
} from "../../../Redux/api/featureApi";
import { toast } from "react-toastify";

export default function EditFeature() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const { data } = useGetSingleFeatureQuery(id);
  const feature = data?.data;

  const [updateFeature, { isLoading }] = useUpdateFeatureMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const icon = images[0]?.file;

    const form = e.target;
    const title = form.title.value;
    const subTitle = form.subTitle.value;
    const link = form.link.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("link", link);
    if (icon) formData.append("icon", icon);

    let res = await updateFeature({ id, formData });
    if (res?.data?.success) {
      toast.success("Feature edit success");
      navigate("/admin/features");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Edit Feature</h2>

        <form onSubmit={handleUpdate} className="p-4 md:w-1/2 mx-auto">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={feature?.title}
              />
            </div>
            <div>
              <p className="mb-1">Sub Title</p>
              <input
                type="text"
                name="subTitle"
                required
                defaultValue={feature?.subTitle}
              />
            </div>
            <div>
              <p className="mb-1">Link</p>
              <input
                type="text"
                name="link"
                required
                defaultValue={feature?.link}
              />
            </div>

            <div>
              <p className="mb-1">Icon</p>
              <div>
                <ImageUploading
                  defaultValue={images}
                  onChange={(icn) => setImages(icn)}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload, onImageRemove, dragProps }) => (
                    <div
                      className="border rounded p-4 border-neutral-content/80"
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
                            <img
                              src={img["data_url"]}
                              alt=""
                              className="w-32 h-20"
                            />
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

                {feature?.icon && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/feature/${
                      feature?.icon
                    }`}
                    alt=""
                    className="w-10 h-10 mt-2"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
