import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useAddFounderSpeechMutation,
  useGetFounderSpeechQuery,
  useUpdateFounderSpeechMutation,
} from "../../../../Redux/api/founderSpeechApi";
import { toast } from "react-toastify";

export default function FounderSpeech() {
  const [images, setImages] = useState([]);

  const { data, isLoading } = useGetFounderSpeechQuery();
  let id = data?.data?._id;

  const [addFounderSpeech, { isLoading: addLoading }] =
    useAddFounderSpeechMutation();
  const [updateFounderSpeech, { isLoading: updateLoading }] =
    useUpdateFounderSpeechMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    let image = images[0]?.file;

    if (!image && !id) return Swal.fire("", "image is required!", "warning");

    const form = e.target;
    const name = form.name.value;
    const facebook = form.facebook.value;
    const linkedin = form.linkedin.value;
    const twitter = form.twitter.value;
    const instagram = form.instagram.value;
    const speech = form.speech.value;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("facebook", facebook);
    formData.append("speech", speech);
    formData.append("linkedin", linkedin);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);

    if (!id) {
      let res = await addFounderSpeech(formData);
      if (res?.data?.success) {
        toast.success("Founder Speech add success");
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    } else {
      let res = await updateFounderSpeech({ id, formData });
      if (res?.data?.success) {
        toast.success("Founder Speech update success");
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
        <h3 className="font-medium text-neutral">Founder Speech</h3>
      </div>

      <form onSubmit={handleAdd} className="p-4">
        <div className="mt-2">
          <p className="text-neutral-content">Founder Name</p>
          <input
            type="text"
            name="name"
            required
            defaultValue={data?.data?.name}
          />
        </div>

        <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <p className="text-neutral-content">Facebook Link</p>
            <input
              type="text"
              name="facebook"
              defaultValue={data?.data?.facebook}
            />
          </div>
          <div>
            <p className="text-neutral-content">Linkedin Link</p>
            <input
              type="text"
              name="linkedin"
              defaultValue={data?.data?.linkedin}
            />
          </div>
          <div>
            <p className="text-neutral-content">Twitter Link</p>
            <input
              type="text"
              name="twitter"
              defaultValue={data?.data?.twitter}
            />
          </div>
          <div>
            <p className="text-neutral-content">Instagram Link</p>
            <input
              type="text"
              name="instagram"
              defaultValue={data?.data?.instagram}
            />
          </div>
        </div>

        <div className="mt-4 text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div className="rounded border">
            <div>
              <p className="border-b p-2">Image</p>
              <div className="p-2">
                <ImageUploading
                  value={images}
                  onChange={(icn) => setImages(icn)}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload, onImageRemove, dragProps }) => (
                    <div
                      className="border rounded border-dashed p-4"
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
                              className="w-40"
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

                {data?.success && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/founder/${
                      data?.data?.image
                    }`}
                    alt=""
                    className="w-32 mt-4"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 border rounded">
            <p className="border-b p-2">Speech</p>

            <div className="p-1">
              <textarea
                name="speech"
                rows="7"
                defaultValue={data?.data?.speech}
              ></textarea>
            </div>
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
