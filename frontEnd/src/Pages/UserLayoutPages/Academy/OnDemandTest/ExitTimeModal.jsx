import { CiWarning } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function ExitTimeModal({
  exitTimeModal,
  setExitTimeModal,
  subjectId,
  isLoading,
  handleExamSubmit,
}) {
  return (
    <>
      <div className={`overlay ${exitTimeModal && "overlay_show"}`}></div>

      <div
        className={`modal w-[95%] md:w-[35%] h-60 md:h-[320px] mx-auto mt-20 md:mt-0 ${
          exitTimeModal && "modal_show"
        }`}
      >
        <div className="h-full p-4 flex flex-col justify-center items-center gap-4">
          <div className="text-7xl text-yellow-500">
            <CiWarning />
          </div>
          <p className="text-neutral-content text-sm">
            Your exam time is over!
          </p>
          <div className="flex gap-2.5">
            <Link
              onClick={() => setExitTimeModal(false)}
              to={`/academy/mcq?subject=${subjectId}`}
              className="bg-red-500 text-base-100 px-4 py-2 rounded text-[15px]"
            >
              Cancel
            </Link>

            <button
              className="secondary_btn"
              disabled={isLoading && "disabled"}
              onClick={handleExamSubmit}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
