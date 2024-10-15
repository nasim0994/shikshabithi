import { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "../../Redux/api/user/authApi";
import { toast } from "react-toastify";

export default function Signup() {
 

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();

  const handleSingup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value.toLowerCase();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password?.length < 8) {
      return setError("Password must be 8 characters");
    } else if (password !== confirmPassword) {
      return setError("Password not match");
    } else {
      setError("");
    }

    const info = {
      name,
      email,
      password,
    };

    setShowPass(false);

    let res = await register(info);


    if (res?.data?.success) {
      toast.success("Resgister success, Please Login Now");
      form.reset()
    } else {
      toast.error("Something went wrong!");
      console.log(res);
    }
  };

  return (
    <div className="flex justify-between items-center h-screen w-full">
      <div className="w-full sm:w-[430px] mx-auto">
        <div className="border shadow rounded p-4">
          <h2 className="text-2xl font-semibold text-center text-neutral mb-2">
            Register
          </h2>
          <form
            onSubmit={handleSingup}
            className="p-4 flex flex-col gap-2 text-sm"
          >
            <div>
              <p className="text-xs flex items-center gap-1 mb-1 text-neutral/95">
                <FaUser className="text-[11px]" />
                Name
              </p>
              <input type="text" name="name" required />
            </div>

            <div>
              <p className="text-xs flex items-center gap-1 mb-1 text-neutral/95">
                <MdEmail />
                Email
              </p>
              <input type="email" name="email" required className="lowercase" />
            </div>

            <div>
              <p className="text-xs flex items-center gap-1 mb-1 text-neutral/95">
                <FaLock className="text-[11px] -mt-px" />
                Password
              </p>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="******"
                  name="password"
                  required
                />

                <div
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2 top-2.5 text-neutral/95 cursor-pointer"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs flex items-center gap-1 mb-1 text-neutral/95">
                <FaLock className="text-[11px] -mt-px" />
                Confirm Password
              </p>
              <input
                type="password"
                placeholder="******"
                name="confirmPassword"
                required
              />
            </div>

            <p className="-mt-1 text-xs text-neutral/90">
              Already registered?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-green-700 duration-200"
              >
                Login
              </Link>
            </p>
            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="mt-2">
              <button
                disabled={isLoading && "disabled"}
                className="w-full text-base-100 bg-primary px-4 py-2 rounded"
              >
                {isLoading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>

          {/* Google Login */}
          {/* <div className="px-4 py-2">
            <div className="pt-2 border-t text-center text-xs text-neutral">
              <p>or</p>
              <p>Log in with Google Account</p>
            </div>

            <div className="mt-3">
              <button className="w-full py-2 rounded bg-[#DD4B39] text-base-100 text-sm flex items-center gap-2 justify-center">
                <FcGoogle /> Google
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
