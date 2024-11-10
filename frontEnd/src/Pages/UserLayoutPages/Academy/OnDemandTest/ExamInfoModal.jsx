import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ExamInfoModal({
  examInfoModal,
  setExamInfoModal,
  length,
}) {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [totalQuestion, setTotalQuestion] = useState(0);
  const [totalMark, setTotalMark] = useState(0);
  const [passMark, setPassMark] = useState(0);
  const [examDuration, setExamDuration] = useState(0);
  const [negativeMark, setNegativeMark] = useState(0);

  const handleStartExam = (e) => {
    e.preventDefault();

    if (totalQuestion > length)
      return setError(`${totalQuestion} MCQ not found`);

    navigate(
      `/academy/test?nq=${totalQuestion}&tm=${totalMark}&pm=${passMark}&ed=${examDuration}&nm=${negativeMark}`
    );
  };

  return (
    <>
      <div
        onClick={() => setExamInfoModal(false)}
        className={`overlay ${examInfoModal && "overlay_show"}`}
      ></div>

      <div
        className={`p-4 modal w-[95%] lg:w-[60%] xl:w-[45%] min-h-60 mx-auto ${
          examInfoModal && "modal_show text-neutral"
        }`}
      >
        <div className="flex justify-end p-3">
          <button onClick={() => setExamInfoModal(false)}>
            <MdClose className="text-xl" />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl ">Self Test</h2>
          <p className="text-neutral-content text-sm">
            Fill up the form and submit
          </p>
        </div>

        <form className="mt-8 text-start text-sm" onSubmit={handleStartExam}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-neutral-content text-[15px] mb-1">
                Subject Total Question
              </p>
              <input
                type="number"
                disabled
                className="bg-secondary text-base-100 border-secondary"
                value={length}
              />
            </div>

            <div>
              <p className="text-neutral-content text-[15px] mb-1">
                Number of Question *
              </p>
              <input
                type="number"
                onChange={(e) => setTotalQuestion(e.target.value)}
                required
              />
            </div>

            <div>
              <p className="text-neutral-content text-[15px] mb-1">
                Total Mark *
              </p>
              <input
                type="number"
                onChange={(e) => setTotalMark(e.target.value)}
                required
              />
            </div>

            <div>
              <p className="text-neutral-content text-[15px] mb-1">
                Pass Mark *
              </p>
              <input
                type="number"
                onChange={(e) => setPassMark(e.target.value)}
                required
              />
            </div>

            <div>
              <p className="text-neutral-content text-[15px] mb-1">
                Exam Duration *
              </p>
              <div className="flex items-center">
                <input
                  type="number"
                  className="rounded-r-none"
                  onChange={(e) => setExamDuration(e.target.value)}
                  required
                />
                <p className="bg-gray-200 px-2 py-1.5 rounded-r">min</p>
              </div>
            </div>

            <div>
              <p className="text-neutral-content text-[15px] mb-1">
                Negative Mark *
              </p>
              <select
                onChange={(e) => setNegativeMark(e.target.value)}
                required
              >
                <option value="0">0.00</option>
                <option value="0.25">0.25</option>
                <option value="0.50">0.50</option>
                <option value="1">1.00</option>
              </select>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          <div className="mt-10 flex items-center justify-center gap-3 text-base-100">
            <div>
              <div
                onClick={() => setExamInfoModal(false)}
                className="bg-gray-300 px-5 py-2 rounded text-neutral cursor-pointer"
              >
                Cancel
              </div>
            </div>
            <div>
              <button className="secondary_btn">Start Exam</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
