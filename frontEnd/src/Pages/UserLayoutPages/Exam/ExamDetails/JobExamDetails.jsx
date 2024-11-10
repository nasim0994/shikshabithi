import { useParams } from "react-router-dom";
import BackBtn from "../../../../Components/BackBtn/BackBtn";
import { useGetSingleJobModelTestQuery } from "../../../../Redux/api/job/jobModelTestApi";
import { useSelector } from "react-redux";
import { useGetModelTestAttendLengthQuery } from "../../../../Redux/api/modelTestAttendApi";
import ModeltestStartBtn from "../ExamList/ModeltestStartBtn";

export default function JobExamDetails() {
  let { id } = useParams();
  const { data } = useGetSingleJobModelTestQuery(id);
  let modelTest = data?.data;

  const { loggedUser } = useSelector((state) => state.user);
  const packageData = loggedUser?.data?.package;

  const { data: modeltestAttend } = useGetModelTestAttendLengthQuery();
  const modelTestAttendLength = modeltestAttend?.data;

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="text-primary text-lg font-semibold hover:text-green-500 duration-300">
          {modelTest?.name}
        </h3>

        <BackBtn />
      </div>

      <div className="p-3">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-neutral/90 text-[13px]">
          <div className="flex gap-4 items-center">
            <span>Institute:</span> <span>{modelTest?.institute?.name}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Question Set:</span> <span>{modelTest?.set?.name}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Vendor:</span> <span>{modelTest?.vendor}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Examiner:</span> <span>{modelTest?.examiner}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Exam type:</span> <span>{modelTest?.examType}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Status:</span> <span>{modelTest?.status}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Participated:</span> <span>{modelTest?.participated}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Total Question:</span> <span>{modelTest?.mcqs?.length}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Total Mark:</span> <span>{modelTest?.totalMark}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Pass Mark:</span> <span>{modelTest?.passMark}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Negative Mark:</span> <span>{modelTest?.negativeMark}</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>Duration:</span> <span>{modelTest?.duration} min.</span>
          </div>
        </div>
      </div>

      <div className="border-t p-3 flex justify-between items-center text-xs font-medium">
        <ModeltestStartBtn
          packageData={packageData}
          modelTestAttendLength={modelTestAttendLength}
          modelTest={modelTest}
          category="job"
        />
      </div>
    </div>
  );
}
