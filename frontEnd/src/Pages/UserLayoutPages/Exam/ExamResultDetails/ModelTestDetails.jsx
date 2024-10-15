import { useEffect, useState } from "react";
import { FaAward, FaBookmark, FaCheck, FaQuestion } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { IoBookmarks } from "react-icons/io5";
import { MdClose, MdDoNotDisturbOn } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useGetSingleAdmissionMTAttendQuery } from "../../../../Redux/api/admission/admissionModelTestAttendApi";
import { useGetSingleModelTestAttendQuery } from "../../../../Redux/api/academy/academyModelTestAttendApi";
import MCQ from "./MCQ";

export default function ModelTestDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let exam = queryParams.get("exam");
  let category = queryParams.get("category");

  const [modelTest, setModelTest] = useState({});

  let mcqs = modelTest?.mcqs;

  const { data: academy, isLoading } = useGetSingleModelTestAttendQuery(exam);
  const { data: admission, isLoading: admissionLoading } =
    useGetSingleAdmissionMTAttendQuery(exam);

  useEffect(() => {
    if (category == "academy") {
      setModelTest(academy?.data);
    } else if (category == "admission") {
      setModelTest(admission?.data);
    } else if (category == "job") {
      setModelTest({});
    }
  }, [category, academy, admission]);

  if ((isLoading, admissionLoading)) return "Loading...";

  return (
    <div>
      <div className="bg-base-100 rounded shadow overflow-hidden">
        <div className="bg-primary text-base-100 p-4 text-center">
          <h2 className="text-xl">
            Model Test <small className="pl-1 text-xs">{category}</small>
          </h2>
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
