import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";
import {
  useAddFeatureImageMutation,
  useGetFeatureImageQuery,
  useUpdateFeatureImageMutation,
} from "../../../Redux/api/featureImageApi";

export default function FeatureImage() {
  const [images, setImages] = useState([]);

  const { data, isLoading } = useGetFeatureImageQuery();
  const featureImage = data?.data;
  const featureImageId = featureImage?._id;

  const [addFeatureImage, { isLoading: addIsLoading }] =
    useAddFeatureImageMutation();
  const [updateFeatureImage, { isLoading: uIsLoading }] =
    useUpdateFeatureImageMutation();

  const handleFeatureImage = async (e) => {
    e.preventDefault();

    if (images?.length <= 0) {
      return toast.error("Please select an image");
    }

    const formData = new FormData();
    formData.append("image", images[0].file);

    if (featureImageId) {
      const res = await updateFeatureImage({ id: featureImageId, formData });
      if (res?.data?.success) {
        toast.success(
          res?.data?.message || "Feature Image Updated Successfully"
        );
        setImages([]);
      } else {
        toast.error("Failed to update Feature Image");
        console.log(res);
      }
    } else {
      const res = await addFeatureImage(formData);
      if (res?.data?.success) {
        toast.success("Feature Image Updated Successfully");
        setImages([]);
      } else {
        toast.error(res?.data?.message || "Failed to update Feature Image");
        console.log(res);
      }
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Feature Image</h3>
      </div>

      <form onSubmit={handleFeatureImage} className="p-4">
        <div className="md:w-1/2 w-full">
          <p className="mb-1">
            Image{" "}
            <small className="text-neutral-content">
              (max size 1mb - png recommended)
            </small>
          </p>
          <div>
            <ImageUploading
              defaultValue={images}
              onChange={(icn) => setImages(icn)}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <div
                  className="border rounded border-dashed p-4 md:flex items-center gap-10"
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
                          alt="feature image"
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
        <div className="mt-4">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/feature/${
              featureImage?.image
            }`}
            alt="feature image"
            className="h-32 object-cover"
          />
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={addIsLoading || uIsLoading}
              className="primary_btn"
            >
              {addIsLoading || uIsLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
