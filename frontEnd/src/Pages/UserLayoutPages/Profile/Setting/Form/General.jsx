import { useUpdateProfileInfoMutation } from "../../../../../Redux/api/user/profileApi";
import { toast } from "react-toastify";

export default function General({ loggedUser }) {
  const [updateProfileInfo, { isLoading }] = useUpdateProfileInfoMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const info = {
      name,
      phone,
      address,
    };

    let res = await updateProfileInfo(info);
    if (res?.data?.success) {
      toast.success("Profile Info Update success");
      window.location.reload();
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="mb-1 text-neutral">
            Full Name
            <sup className="text-red-500">*</sup>
          </p>
          <input
            type="text"
            name="name"
            required
            defaultValue={loggedUser?.data?.profile?.name}
          />
        </div>

        <div>
          <p className="mb-1 text-neutral">
            Email
            <sup className="text-red-500">*</sup>
          </p>
          <input
            type="email"
            name="email"
            required
            defaultValue={loggedUser?.data?.email}
            disabled
          />
        </div>

        <div>
          <p className="mb-1 text-neutral">Phone</p>
          <input
            type="text"
            name="phone"
            defaultValue={loggedUser?.data?.profile?.phone}
          />
        </div>

        <div>
          <p className="mb-1 text-neutral">Address</p>
          <input
            type="text"
            name="address"
            defaultValue={loggedUser?.data?.profile?.address}
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
