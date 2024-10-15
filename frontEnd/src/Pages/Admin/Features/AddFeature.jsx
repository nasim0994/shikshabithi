import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { useAddFeatureMutation } from "../../../Redux/api/featureApi";
import { toast } from "react-toastify";

export default function AddFeature() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [addFeature, { isLoading }] = useAddFeatureMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const icon = images[0]?.file;
    if (!icon) return toast.warning("Icon is required!");

    const form = e.target;
    const title = form.title.value;
    const subTitle = form.subTitle.value;
    const link = form.link.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("link", link);
    formData.append("icon", icon);

    let res = await addFeature(formData);
    if (res?.data?.success) {
      toast.success("Feature add success");
      navigate("/admin/features");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Add Feature</h2>

        <form onSubmit={handleAdd} className="p-4 md:w-1/2 mx-auto">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" required />
            </div>
            <div>
              <p className="mb-1">Sub Title</p>
              <input type="text" name="subTitle" required />
            </div>
            <div>
              <p className="mb-1">Link</p>
              <input type="text" name="link" required />
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
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
