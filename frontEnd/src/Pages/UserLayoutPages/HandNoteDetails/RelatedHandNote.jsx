import { Link } from "react-router-dom";
import AcademySkeleton from "../../../Components/Skeleton/AcademySkeleton";
import { useGetHandNotesQuery } from "../../../Redux/api/handnotesApi";
import moment from "moment";

export default function RelatedHandNote({ category }) {
  const { data, isLoading } = useGetHandNotesQuery({
    category,
    limit: 5,
    page: 1,
  });
  const handnotes = data?.data;

  if (isLoading) return <AcademySkeleton />;

  return (
    <div>
      <div className="bg-base-100 rounded shadow p-3">
        <h3 className="text-neutral text-[15px]">Related HandNote</h3>
      </div>

      <div className="bg-base-100 rounded shadow p-3 mt-2 flex flex-col gap-3">
        {handnotes?.map((note) => (
          <Link
            key={note._id}
            to={`/handnotes/${note._id}`}
            className="border-b pb-2"
          >
            <h4 className="text-neutral ">{note.title}</h4>
            <div className="text-xs text-neutral-content flex justify-between items-center">
              <p>{note.category}</p> <p>{moment(note.createdAt).fromNow()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
