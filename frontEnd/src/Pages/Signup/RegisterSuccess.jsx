import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function RegisterSuccess() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-[90%] sm:w-96 rounded shadow overflow-hidden">
        <div className="py-10 flex flex-col gap-2 justify-center items-center bg-green-600 text-base-100">
          <AiOutlineCheckCircle className="text-4xl" />
          <h1 className="text-xl">Registration Successful</h1>
        </div>

        <div className="py-10 px-6">
          <h1 className="text-center text-neutral-content">
            You have successfully registered. <br /> Please verify your email
            address to activate your account.
          </h1>

          <div className="flex justify-center mt-10">
            <Link to="/login" className="primary_btn text-sm">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
