import { useEffect, useState } from "react";
import AcademySkeleton from "../../../Components/Skeleton/AcademySkeleton";
import { useGetHandNotesQuery } from "../../../Redux/api/handnotesApi";
import Note from "./Note";
import Pagination from "../../../Components/Pagination/Pagination";

export default function Notes({ activeCategory, selectedSubject }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
  query["page"] = currentPage;
  query["limit"] = 10;

  const { data, isLoading, isFetching } = useGetHandNotesQuery({ ...query });
  const handnotes = data?.data;

  if (isLoading || isFetching) return <AcademySkeleton />;

  return (
    <div className="mt-2 flex flex-col gap-2">
      {handnotes?.length > 0 ? (
        handnotes?.map((handnote, i) => (
          <Note key={i} handnote={handnote} i={i} />
        ))
      ) : (
        <p className="text-xs text-red-500">No Available Handnote</p>
      )}

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
