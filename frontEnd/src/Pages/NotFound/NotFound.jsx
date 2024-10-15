import { useNavigate } from "react-router-dom";

export default function NotFound() {
  let history = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-screen">
      <h2 className="text-8xl font-extrabold text-primary">Oops!🙄</h2>
      <h2 className=" uppercase">404 - this page not found</h2>
      <button className="primary_btn rounded-xl" onClick={() => history(-1)}>
        Go Back
      </button>
    </div>
  );
}
