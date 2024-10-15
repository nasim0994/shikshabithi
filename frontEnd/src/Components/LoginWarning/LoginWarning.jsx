import { Link } from "react-router-dom";

export default function LoginWarning({ setModal }) {
  return (
    <div className="mt-6">
      <h2 className="text-neutral/90 text-xl font-medium text-center mb-6">
        Login Required
      </h2>
      <p className="text-center text-neutral/90">
        Please, login first.{" "}
        <Link to="/login" className="text-primary underline">
          click here to login
        </Link>
      </p>

      <div className="mt-6 flex justify-center items-center gap-3 text-sm">
        <button
          onClick={() => setModal(false)}
          className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
        >
          Cancel
        </button>
        <Link to="/login" className="primary_btn">
          Login
        </Link>
      </div>
    </div>
  );
}
