import { useParams } from "react-router-dom";
import BackBtn from "../../../../Components/BackBtn/BackBtn";
import ModeltestStartBtn from "../ExamList/ModeltestStartBtn";
import { useGetModelTestAttendLengthQuery } from "../../../../Redux/api/modelTestAttendApi";
import { useSelector } from "react-redux";
import { useGetSingleModelTestQuery } from "../../../../Redux/api/modelTestApi";

export default function ExamDetails() {
  let { id } = useParams();
  const { data } = useGetSingleModelTestQuery(id);
  let modelTest = data?.data;

  const { loggedUser } = useSelector((state) => state.user);
  const packageData = loggedUser?.data?.package;

  const { data: modeltestAttend } = useGetModelTestAttendLengthQuery();
  const modelTestAttendLength = modeltestAttend?.data;

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-3 border-b flex justify-between items-center">
        <h2 className="text-primary text-lg font-semibold">
          {modelTest?.name}
        </h2>

        <BackBtn />
      </div>

      <div className="p-3">
        <div className="xl:w-[70%] mx-auto text-neutral/90 text-[13px]">
          {modelTest?.mainCategory == "academy" && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex gap-4 items-center">
                <span>Category:</span> <span>{modelTest?.category?.name}</span>
              </div>
              <div className="flex gap-4 items-center">
                <span>Class:</span> <span>{modelTest?.subCategory?.name}</span>
              </div>
              <div className="flex gap-4 items-center">
                <span>Subject:</span> <span>{modelTest?.subject?.name}</span>
              </div>
              {modelTest?.chapter && (
                <div className="flex gap-4 items-center">
                  <span>Chapter:</span> <span>{modelTest?.chapter?.name}</span>
                </div>
              )}
            </div>
          )}

          {modelTest?.mainCategory == "admission" && (
            <div className="grid sm:grid-cols-2  gap-4">
              <div className="flex gap-4 items-center">
                <span>University:</span>{" "}
                <span>{modelTest?.category?.name}</span>
              </div>
              <div className="flex gap-4 items-center">
                <span>Question Set:</span>{" "}
                <span>{modelTest?.subCategory?.name}</span>
              </div>
            </div>
          )}

          {modelTest?.mainCategory == "job" && (
            <div className="grid sm:grid-cols-2  gap-4">
              <div className="flex gap-4 items-center">
                <span>Institute:</span> <span>{modelTest?.category?.name}</span>
              </div>
              <div className="flex gap-4 items-center">
                <span>Question Set:</span>{" "}
                <span>{modelTest?.subCategory?.name}</span>
              </div>
            </div>
          )}

          <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex gap-4 items-center">
              <span>Vendor:</span>{" "}
              <span>{modelTest?.vendor?.profile?.name}</span>
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
              <span>Total Question:</span>{" "}
              <span>{modelTest?.mcqs?.length}</span>
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
      </div>

      <div className="border-t p-3 flex justify-between items-center text-xs font-medium">
        <ModeltestStartBtn
          packageData={packageData}
          modelTestAttendLength={modelTestAttendLength}
          modelTest={modelTest}
          category="academy"
        />
      </div>
    </div>
  );
}
