import { toast } from "react-toastify";
import { useUpdateProfileInfoMutation } from "../../../../../Redux/api/user/profileApi";

export default function PersonalInfo({ loggedUser }) {
  const [updateProfileInfo, { isLoading }] = useUpdateProfileInfoMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const bio = form.bio.value;
    const profession = form.profession.value;
    const educationLevel = form.educationLevel.value;
    const institute = form.institute.value;
    const organization = form.organization.value;

    const info = {
      bio,
      profession,
      educationLevel,
      institute,
      organization,
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
          <p className="mb-1 text-neutral">Bio</p>
          <input
            type="text"
            name="bio"
            defaultValue={loggedUser?.data?.profile?.bio}
          />
        </div>

        <div>
          <p className="mb-1 text-neutral">Profession</p>
          <input
            type="text"
            name="profession"
            defaultValue={loggedUser?.data?.profile?.profession}
          />
        </div>

        <div>
          <p className="mb-1 text-neutral">Education Level (last one)</p>
          <input
            type="text"
            name="educationLevel"
            defaultValue={loggedUser?.data?.educationLevel}
          />
        </div>

        <div>
          <p className="mb-1 text-neutral">Institute Name</p>
          <input
            type="text"
            name="institute"
            defaultValue={loggedUser?.data?.profile?.institute}
          />
        </div>

        <div>
          <p className="mb-1 text-neutral">Current Organization</p>
          <input
            type="text"
            name="organization"
            defaultValue={loggedUser?.data?.profile?.organization}
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
