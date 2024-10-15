import { FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";
import SubjectCard from "./SubjectCard";
import { useGetJobAllMcqQuery } from "../../../../Redux/api/job/jobMcqApi";

export default function SetCard({ set }) {
  const setId = set?._id;

  let query = {};
  query["set"] = setId;
  const { data } = useGetJobAllMcqQuery({ ...query });
  const subjects = data?.data;

  return (
    <div className="bg-base-100 rounded shadow p-4 hover:bg-primary/5 duration-300">
      <div className="flex items-start gap-4">
        <div className="w-11 h-10 flex justify-center items-center bg-primary/15 rounded">
          <FaUniversity className="text-lg text-neutral" />
        </div>

        <div>
          <div className="flex items-center gap-1">
            <Link
              to={`/job-assistant/question-bank/${set?._id}`}
              className="hover:text-primary duration-200"
            >
              <h2>{set?.name}</h2>
            </Link>
            <span className="bg-primary px-1 py-px rounded text-base-100 text-[10px]">
              {set?.year}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 text-[11px] mt-1">
            {subjects?.map((subject) => (
              <SubjectCard key={subject?._id} subject={subject} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
