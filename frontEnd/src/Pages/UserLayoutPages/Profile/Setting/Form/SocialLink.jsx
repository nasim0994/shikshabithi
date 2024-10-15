import { toast } from "react-toastify";
import { useUpdateProfileInfoMutation } from "../../../../../Redux/api/user/profileApi";

export default function SocialLink({ loggedUser }) {
  const [updateProfileInfo, { isLoading }] = useUpdateProfileInfoMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const website = form.website.value;
    const facebook = form.facebook.value;
    const instagram = form.instagram.value;
    const youtube = form.youtube.value;

    const info = {
      website,
      facebook,
      instagram,
      youtube,
    };

    let res = await updateProfileInfo(info);
    if (res?.data?.success) {
      toast.success("Profile Info Update success");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="mb-1 text-neutral">Website</p>
          <input
            type="text"
            name="website"
            defaultValue={loggedUser?.data?.profile?.website}
          />
        </div>

        <div>
          <p className="mb-1 text-neutral">Facebook</p>
          <input
            type="text"
            name="facebook"
            defaultValue={loggedUser?.data?.profile?.facebook}
          />
        </div>

        <div>
          <p className="mb-1 text-neutral">Instagram</p>
          <input
            type="text"
            name="instagram"
            defaultValue={loggedUser?.data?.instagram}
          />
        </div>

        <div>
          <p className="mb-1 text-neutral">Youtube</p>
          <input
            type="text"
            name="youtube"
            defaultValue={loggedUser?.data?.profile?.youtube}
          />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t">
        <button
          disabled={isLoading && "disabled"}
          className="bg-primary/10 text-primary px-3 py-2 rounded text-xs hover:bg-primary duration-300 hover:text-base-100"
        >
          {isLoading ? "Loading..." : "Save Change"}
        </button>
      </div>
    </form>
  );
}
