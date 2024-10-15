import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function BackBtn() {
  let history = useNavigate();
  return (
    <button
      onClick={() => history(-1)}
      className="bg-primary/40 hover:bg-primary hover:text-base-100 duration-300 px-2 py-1.5 rounded flex items-center gap-1 text-xs"
    >
      <IoMdArrowBack /> <h2>Back</h2>
    </button>
  );
}
