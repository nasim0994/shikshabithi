import { useParams } from "react-router-dom";
import { useGetSingleAcademyModelTestQuery } from "../../../../Redux/api/academy/modeltestApi";
import { FaBookmark, FaQuestion } from "react-icons/fa";
import MCQ from "./MCQ";

export default function ExamResultDetails() {
  const { id } = useParams();
  const { data } = useGetSingleAcademyModelTestQuery(id);
  const mcq = data?.data;

  return (
    <div>
      <div className="bg-base-100 rounded shadow overflow-hidden">
        <div className="bg-primary text-base-100 p-4 text-center">
          <h2 className="text-xl">On Demand Model Test</h2>
        </div>

        <div className="p-4 md:w-1/2 mx-auto grid grid-cols-2 gap-3 text-[13px]">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-base-100 p-2 rounded">
              <FaQuestion />
            </div>
            <div>
              <p>{mcq?.totalQuestion}</p>
              <p className="text-neutral-content text-xs">TOTAL QUESTION</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-secondary text-base-100 p-2 rounded">
              <FaBookmark />
            </div>
            <div>
              <p>{mcq?.totalMark}</p>
              <p className="text-neutral-content text-xs">TOTAL MARK</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-primary text-base-100 p-2 rounded">
              <FaQuestion />
            </div>
            <div>
              <p>{mcq?.result?.totalRightAns + mcq?.result?.totalWrongAns}</p>
              <p className="text-neutral-content text-xs">ANSWERED</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-primary text-base-100 p-2 rounded">
              <FaQuestion />
            </div>
            <div>
              <p>{mcq?.result?.totalRightAns}</p>
              <p className="text-neutral-content text-xs">RIGHT ANSWER</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-secondary text-base-100 p-2 rounded">
              <FaBookmark />
            </div>
            <div>
              <p>{mcq?.result?.totalWrongAns}</p>
              <p className="text-neutral-content text-xs">WRONG ANSWER</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-secondary text-base-100 p-2 rounded">
              <FaBookmark />
            </div>
            <div>
              <p>{mcq?.result?.obtainMark}</p>
              <p className="text-neutral-content text-xs">OBTAIN MARK</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-secondary text-base-100 p-2 rounded">
              <FaBookmark />
            </div>
            <div>
              <p>{mcq?.passMark}</p>
              <p className="text-neutral-content text-xs">PASS MARK</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-secondary text-base-100 p-2 rounded">
              <FaBookmark />
            </div>
            <div>
              <p>- {mcq?.result?.totalNegativeMark}</p>
              <p className="text-neutral-content text-xs">NEGATIVE MARK</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 flex justify-center">
        <h2 className="text-xl font-semibold border-b inline-block border-neutral">
          {mcq?.subject?.name}
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {mcq?.mcqs?.map((question, i) => (
          <MCQ key={question?._id} i={i} question={question} />
        ))}
      </div>
    </div>
  );
}
