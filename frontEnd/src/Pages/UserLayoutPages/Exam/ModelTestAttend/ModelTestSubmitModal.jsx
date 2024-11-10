import { Link } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";

export default function ModelTestSubmitModal({ exitTimeModal, category }) {
  return (
    <>
      <div className={`overlay  ${exitTimeModal && "overlay_show"}`}></div>
      <div
        className={`modal w-[90%] sm:w-[380px] p-6 rounded ${
          exitTimeModal && "modal_show"
        }`}
      >
        <div className="flex flex-col justify-center items-center text-center gap-6">
          <CiCircleCheck className="text-green-500 text-6xl" />
          <h2 className="text-neutral-content text-sm">
            Exam submit successfully. Click view details button to view exam
            details.
          </h2>

          <div className="flex gap-4 text-sm">
            <Link
              to={`/exam-result`}
              className="bg-primary text-base-100 px-4 py-1.5 rounded hover:bg-primary/95 duration-150"
            >
              View Result
            </Link>
            <Link
              to={`/exam-list?active=${category}`}
              className="bg-gray-200 text-neutral px-4 py-1.5 rounded hover:bg-gray-100 duration-150"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
