import { Link } from "react-router-dom";
import { useGetAcademyMCQQuery } from "../../../Redux/api/academy/mcqApi";

export default function SubjectMCQ({ subject }) {
  const subjectId = subject?._id;
  let query = {};
  query["subject"] = subjectId;
  const { data } = useGetAcademyMCQQuery({ ...query });

  return (
    <li>
      <Link
        to={`/academy/subject-${subjectId}/mcq`}
        className="flex justify-between items-center text-sm bg-secondary/10 p-2 rounded"
      >
        <p>{subject?.name}</p>
        <p className="bg-primary text-base-100 px-1 py-px rounded-xl text-xs">
          {data?.data?.length}
        </p>
      </Link>
    </li>
  );
}
