import { FaAward, FaBookmark, FaCheck, FaQuestion } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { IoBookmarks } from "react-icons/io5";
import { MdClose, MdDoNotDisturbOn } from "react-icons/md";
import { useParams } from "react-router-dom";
import MCQ from "./MCQ";
import { useGetSingleModelTestAttendQuery } from "../../../../Redux/api/modelTestAttendApi";

export default function ModelTestDetails() {
  const { id } = useParams();

  const { data: modelTestData } = useGetSingleModelTestAttendQuery(id);
  const modelTest = modelTestData?.data;

  let mcqs = modelTest?.mcqs;

  return (
    <div>
      <div className="bg-base-100 rounded shadow overflow-hidden">
        <div className="bg-primary text-base-100 p-4 text-center">
          <h2 className="text-xl">{modelTest?.modelTestType}</h2>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3 text-[13px]">
          <div className="flex items-center gap-2">
            <div className="bg-primary/80 text-base-100 p-2 rounded">
              <FaQuestion />
            </div>
            <div>
              <p>{modelTest?.modelTest?.mcqs?.length}</p>
              <p className="text-neutral-content text-xs">TOTAL QUESTION</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-primary/80 text-base-100 p-2 rounded">
              <IoBookmarks />
            </div>
            <div>
              <p>{modelTest?.modelTest?.totalMark}</p>
              <p className="text-neutral-content text-xs">TOTAL MARK</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-primary/80 text-base-100 p-2 rounded">
              <FaListCheck />
            </div>
            <div>
              <p>
                {modelTest?.result?.totalRightAns +
                  modelTest?.result?.totalWrongAns}
              </p>
              <p className="text-neutral-content text-xs">ANSWERED</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-primary/80 text-base-100 p-2 rounded">
              <FaCheck />
            </div>
            <div>
              <p>{modelTest?.result?.totalRightAns}</p>
              <p className="text-neutral-content text-xs">RIGHT ANSWER</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-secondary/80 text-base-100 p-2 rounded">
              <MdClose />
            </div>
            <div>
              <p>{modelTest?.result?.totalWrongAns}</p>
              <p className="text-neutral-content text-xs">WRONG ANSWER</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-primary/80 text-base-100 p-2 rounded">
              <FaAward />
            </div>
            <div>
              <p>{modelTest?.result?.obtainMark}</p>
              <p className="text-neutral-content text-xs">OBTAIN MARK</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-primary/80 text-base-100 p-2 rounded">
              <FaBookmark />
            </div>
            <div>
              <p>{modelTest?.modelTest?.passMark}</p>
              <p className="text-neutral-content text-xs">PASS MARK</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-secondary/80 text-base-100 p-2 rounded">
              <MdDoNotDisturbOn />
            </div>
            <div>
              <p>- {modelTest?.result?.totalNegativeMark}</p>
              <p className="text-neutral-content text-xs">NEGATIVE MARK</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 grid sm:grid-cols-2 gap-4">
        {mcqs?.map((question, i) => (
          <MCQ key={question?._id} i={i} question={question} />
        ))}
      </div>
    </div>
  );
}
