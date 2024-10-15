import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useAddFaviconMutation,
  useGetFaviconQuery,
  useUpdateFaviconMutation,
} from "../../../../Redux/api/faviconApi";

export default function Favicon() {
  const [icons, setIcons] = useState([]);

  const { data, isLoading } = useGetFaviconQuery();
  let id = data?.data?._id;

  const [addFavicon, { isLoading: addLoading }] = useAddFaviconMutation();
  const [updateFavicon, { isLoading: updateLoading }] =
    useUpdateFaviconMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    let icon = icons[0]?.file;

    if (!icon) return Swal.fire("", "icon is required!", "warning");

    const formData = new FormData();
    formData.append("icon", icon);

    if (!id) {
      let res = await addFavicon(formData);
      if (res?.data?.success) {
        toast.success("Favicon add success");
        setIcons([]);
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    } else {
      let res = await updateFavicon({ id, formData });
      if (res?.data?.success) {
        toast.success("Favicon update success");
        setIcons([]);
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    }
  };

  if (isLoading) return "Loading...";

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Favicon</h3>
      </div>

      <form onSubmit={handleAdd} className="p-4">
        <div>
          <p className="mb-1">Favicon</p>
          <div>
            <ImageUploading
              defaultValue={icons}
              onChange={(icn) => setIcons(icn)}
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

                  <div className={`${icons?.length > 0 && "mt-4"} `}>
                    {icons?.map((img, index) => (
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
        <div className="mt-4">
          <img
            src={`${import.meta.env.VITE_API_URL}/favicon/${data?.data?.icon}`}
            alt=""
            className="w-32"
          />
        </div>

        <div className="mt-5">
          <button
            disabled={updateLoading && "disabled"}
            className="primary_btn"
          >
            {updateLoading || addLoading ? "Loading" : id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
