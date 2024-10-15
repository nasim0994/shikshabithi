import { MdEmail } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../Redux/api/user/authApi";
import { useState } from "react";

export default function ForgotPassword() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  let [emailSent, setEmailSent] = useState(false);

  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.toLowerCase();

    let res = await forgotPassword({ email });

    if (res?.data?.success) {
      setEmailSent(true);
      setError("");
    } else {
      setError(res?.data ? res?.data?.error : "something went wrong!");
    }
  };

  if (emailSent) {
    return (
      <div className="w-full h-screen flex text-lg justify-center items-center">
        <FaCheck className="mr-2 text-green-500" />
        <h3>Your request has been success. Please Check you Email</h3>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between items-center h-screen w-full">
        <div className="w-full sm:w-[430px] mx-auto">
          <div className="border shadow rounded p-4">
            <h2 className="text-2xl font-semibold text-center text-neutral mb-6">
              Forgot Password
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
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="mt-4">
                <button
                  disabled={isLoading && "disabled"}
                  className="text-base-100 bg-primary border border-transparent px-4 py-2 rounded"
                >
                  Submit
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
}
