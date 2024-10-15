import { Link } from "react-router-dom";

export default function SubjectCard({ subject }) {
  return subject?.subjects?.map((s) => (
    <Link
      key={s?._id}
      to={`/academy/subject-${s?.subject?._id}/chapters`}
      className="bg-gray-100 rounded px-1 py-px hover:bg-primary/20 duration-200"
    >
      {s?.subject?.name}
      <span className="bg-neutral text-base-100 rounded-full px-1 py-px ml-1">
        {s?.mcqs?.length}
      </span>
    </Link>
  ));
}
