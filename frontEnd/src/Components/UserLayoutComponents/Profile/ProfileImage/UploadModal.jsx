import { IoClose } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { useUpdateProfileImageMutation } from "../../../../Redux/api/user/profileApi";
import { toast } from "react-toastify";

export default function UploadModal({ modal, setModal }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState([]);

  const [updateProfileImage, { isLoading }] = useUpdateProfileImageMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const image = images[0]?.file;

    console.log("image",image); 

    if (!image) {
      return setError("Image is requerd!");
    }
    const formData = new FormData();
    formData.append("image", image);

    let res = await updateProfileImage(formData);


    console.log(res)

    if (res?.data?.success) {
      toast.success("Profile image update success");
      setModal(false);
      setError("");
      window.location.reload();
    } else {
      setError(res?.data?.message || "Something went wrong!");
      console.log(res);
    }
  };

  return (
    <div className={`overlay ${modal && "overlay_show"}`}>
      <div
        className={`modal w-[95%] sm:w-[450px] p-4 ${modal && "modal_show"}`}
      >
        <div className="flex justify-end">
          <button onClick={() => setModal(false)}>
            <IoClose />
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-medium text-neutral">Upload Image</h2>
          <p className="text-sm text-neutral-content">Choose image & upload</p>
        </div>

        <form onSubmit={handleUpdate} className="mt-8">
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

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="mt-6 flex justify-center gap-3">
            <div
              onClick={() => setModal(false)}
              className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </div>
            <button className="primary_btn">
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
