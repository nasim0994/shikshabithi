import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useUpdatePasswordMutation } from "../../../../../Redux/api/user/profileApi";
import { userLogout } from "../../../../../Redux/api/user/userSlice";

export default function ChangePassword() {
  const [serror, setError] = useState("");
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();

    const form = e.target;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;
    const rePassword = form.rePassword.value;

    if (newPassword !== rePassword) {
      return setError("password not match!");
    } else {
      setError("");
    }

    const info = {
      oldPassword,
      newPassword,
    };

    let res = await updatePassword(info);
    if (res?.data?.success) {
      toast.success("Password update success");
      dispatch(userLogout());
      navigate("/login");
    } else {
      toast.error("something went wrong!");
      console.log(res);
      setError(res?.error?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleChange}
      className="sm:w-1/2 mx-auto flex flex-col gap-2 text-sm py-3"
    >
      <div>
        <p className="mb-1 text-neutral">
          Old Password <sup className="text-red-500">*</sup>
        </p>
        <input type="password" name="oldPassword" required />
      </div>

      <div>
        <p className="mb-1 text-neutral">
          New Password <sup className="text-red-500">*</sup>
        </p>
        <input type="password" name="newPassword" required />
      </div>

      <div>
        <p className="mb-1 text-neutral">
          Re password <sup className="text-red-500">*</sup>
        </p>
        <input type="password" name="rePassword" required />
      </div>

      {serror && <p className="mt-1 text-red-500 text-xs">{serror}</p>}

      <div className="pt-3 border-t">
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
