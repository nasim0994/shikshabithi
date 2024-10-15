import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAcademyMCQQuery } from "../../../../Redux/api/academy/mcqApi";
import { useGetAcademyWrittenQuery } from "../../../../Redux/api/academy/writtenApi";

export default function Subject({ subject }) {
  const subjectId = subject?._id;
  let query = {};
  query["subject"] = subjectId;
  const { data } = useGetAcademyMCQQuery({ ...query });
  const { data: written } = useGetAcademyWrittenQuery({ ...query });
  const writtens = written?.data;

  return (
    <li className="flex justify-between items-center border-b pb-6">
      <div className="flex items-center gap-5">
        <FaBook className="text-neutral-content text-2xl sm:text-4xl" />
        <div>
          <Link
            to={`/academy/subject-${subjectId}/chapters`}
            className="hover:text-primary duration-200 text-sm sm:tetx-base"
          >
            {subject?.name}
          </Link>
          <div className="mt-1 flex items-center gap-16 text-xs">
            <Link
              to={`/academy/mcq?subject=${subjectId}`}
              className="bg-gray-100 p-1 rounded text-neutral-content"
            >
              MCQ ({data?.data?.length})
            </Link>
            <Link
              to={`/academy/written?subject=${subjectId}`}
              className="bg-gray-100 p-1 rounded text-neutral-content"
            >
              Written ({writtens?.length})
            </Link>
          </div>
        </div>
      </div>

      {/* <div>
        <button className="flex items-center gap-2 text-sm text-neutral">
          <FaPrint /> Print
        </button>
      </div> */}
    </li>
  );
}
