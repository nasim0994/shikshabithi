import { MdEmail } from "react-icons/md";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useSetNewPasswordMutation } from "../../Redux/api/user/authApi";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function RecoverPassword() {
  const [recoverNewPassword, { isLoading }] = useSetNewPasswordMutation();
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  let [Password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const decodeToken = jwtDecode(token);

  if (token) {
    try {
      const currentTime = Date.now() / 1000; // current time in seconds

      if (decodeToken.exp < currentTime) {
        return (
          <div className="w-full h-screen text-red-600 flex justify-center items-center">
            <div className="animate-drop">
              <IoIosWarning size={20} />
            </div>
            <p>
              Token is Expired. Please{" "}
              <Link className="text-primary border-b font-semibold" to="/login">
                try again.
              </Link>
            </p>
          </div>
        );
      }
    } catch (error) {
      console.log("Invalid token");
    }
  } else {
    console.log("No token found");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const newPassword = Password;

    if (newPassword === confirmPassword) {
      const info = {
        token,
        newPassword,
      };

      let res = await recoverNewPassword(info);

      if (res?.data?.success) {
        localStorage.removeItem("token");
        toast.success("Your password is change successfully");
        navigate("/login");
        setError("");
      } else {
        setError(res?.data ? res?.data?.error : "something went wrong!");
        console.log(res);
      }
    } else {
      setError("Password must be same");
    }
  };
  return (
    <div className="flex justify-between items-center h-screen w-full">
      <div className="w-full sm:w-[430px] mx-auto">
        <div className="border shadow rounded p-4">
          <h2 className="text-2xl font-semibold text-center text-neutral mb-6">
            Set New Password
          </h2>
          <form onSubmit={handleLogin} className="p-4">
            <div className="mb-4">
              <p className="text-sm flex items-center gap-1 mb-1 text-neutral/95">
                <MdEmail />
                Email
              </p>
              <input
                type="email"
                disabled
                defaultValue={decodeToken?.email}
                className="lowercase bg-black/10"
              />
            </div>
            <div className="mb-4">
              <p className="text-sm flex items-center gap-1 mb-1 text-neutral/95">
                <RiLockPasswordFill />
                New Password
              </p>
              <input
                type="password"
                placeholder="********"
                name="newPassword"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="lowercase"
              />
            </div>
            <div className="mb-4">
              <p className="text-sm flex items-center gap-1 mb-1 text-neutral/95">
                <RiLockPasswordFill />
                Confirm Password
              </p>
              <input
                type="password"
                placeholder="********"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="lowercase"
              />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <div className="mt-4">
              <button
                disabled={isLoading && "disabled"}
                className="text-base-100 bg-primary border border-transparent px-4 py-2 rounded"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
              <Link
                to="/login"
                className="text-primary ml-2 bg-transparent border border-primary px-4 py-2 rounded"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
