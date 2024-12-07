import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
import { useLoginMutation } from "../../Redux/api/user/authApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { loggedUser } = useSelector((store) => store.user);
  const from = location.state?.from?.pathname || "/";
  if (loggedUser?.success) {
    if (from.startsWith("/admin") && loggedUser?.data?.role !== "admin") {
      navigate("/");
    } else {
      navigate(from, { replace: true });
    }
  }

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.toLowerCase();
    const password = form.password.value;

    const info = {
      email,
      password,
    };

    setShowPass(false);

    let res = await login(info);

    if (res?.data?.success) {
      toast.success("Login Success");
      setError("");
    } else {
      setError(res?.error?.data?.error || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <div className="flex justify-between items-center h-screen w-full">
      <div className="w-full sm:w-[430px] mx-auto">
        <div className="border shadow rounded p-4">
          <h2 className="text-2xl font-semibold text-center text-neutral mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin} className="p-4">
            <div className="mb-4">
              <p className="text-sm flex items-center gap-1 mb-1 text-neutral/95">
                <MdEmail />
                Email
              </p>
              <input
                type="text"
                placeholder="Enter email"
                name="email"
                required
                className="lowercase"
              />
            </div>
            <div>
              <p className="text-sm flex items-center gap-1 mb-1 text-neutral/95">
                <FaLock className="text-xs  -mt-px" />
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
              <Link
                to="/forgotPassword"
                className="text-neutral-content text-xs hover:text-neutral duration-200"
              >
                Forgot your password?
              </Link>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="mt-4">
              <button
                disabled={isLoading && "disabled"}
                className="w-full text-base-100 bg-primary px-4 py-2 rounded"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>

          {/* Google Login */}
          {/* <div className="px-4 py-2">
            <div className="pt-3 border-t text-center text-xs text-neutral">
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

        <div className="mt-2 text-xs text-neutral text-center">
          <p>
            New to Smart Sikon?{" "}
            <Link
              to="/signup"
              className="text-primary hover:text-green-700 duration-200"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
