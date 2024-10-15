import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAcademyMCQQuery } from "../../../../../Redux/api/academy/mcqApi";

export default function Subject({ subject }) {
  let query = {};
  query["subject"] = subject?._id;
  const { data } = useGetAcademyMCQQuery({ ...query });
  const mcqs = data?.data;

  return (
    <div className="flex items-center gap-4 bg-base-100 shadow rounded px-2 py-4 hover:bg-primary/5 duration-200">
      <FaBook className="text-neutral-content text-2xl sm:text-3xl" />
      <div>
        <Link
          to={`/academy/subject-${subject?._id}/chapters`}
          className="hover:text-primary duration-200 text-sm mb-2"
        >
          {subject?.name} || {subject?.class?.name}
        </Link>

        <div className="mt-1.5 text-[10px]">
          <Link
            to={`/academy/mcq?subject=${subject?._id}`}
            className="bg-gray-100 p-1 rounded text-neutral-content hover:bg-base-100 duration-200"
          >
            MCQ ({mcqs?.length})
          </Link>
        </div>
      </div>
    </div>
  );
}
