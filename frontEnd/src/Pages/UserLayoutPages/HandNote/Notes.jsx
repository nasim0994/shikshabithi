import AcademySkeleton from "../../../Components/Skeleton/AcademySkeleton";
import { useGetHandNotesQuery } from "../../../Redux/api/handnotesApi";

import Note from "./Note";

export default function Notes({ activeCategory, selectedSubject }) {
  let query = {};
  query["category"] =
    activeCategory == 1
      ? "academy"
      : activeCategory == 2
      ? "admission"
      : activeCategory == 3
      ? "job"
      : "others";
  query["subject"] = selectedSubject;
  query["status"] = "active";

  const { data, isLoading } = useGetHandNotesQuery({ ...query });
  const handnotes = data?.data;

  if (isLoading) return <AcademySkeleton />;

  return (
    <div className="mt-2 flex flex-col gap-2">
      {handnotes?.length > 0 ? (
        handnotes?.map((handnote, i) => (
          <Note key={i} handnote={handnote} i={i} />
        ))
      ) : (
        <p className="text-xs text-red-500">No Available Handnote</p>
      )}
    </div>
  );
}
