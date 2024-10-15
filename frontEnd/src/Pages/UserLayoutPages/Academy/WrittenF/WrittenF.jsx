import { Link, useLocation } from "react-router-dom";
import WrittenCard from "./WrittenCard";
import { useGetAcademyWrittenQuery } from "../../../../Redux/api/academy/writtenApi";

export default function WrittenF() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subjectId = queryParams.get("subject");
  const chapterId = queryParams.get("chapter");

  let query = {};
  query["subject"] = subjectId;
  query["chapter"] = chapterId;

  const { data: written } = useGetAcademyWrittenQuery({ ...query });
  const writtens = written?.data;

  const subjectNewId = subjectId
    ? subjectId
    : writtens?.length > 0 && writtens[0]?.subject?._id;

  return (
    <div>
      <section className="grid md:grid-cols-3 items-start gap-6">
        <div className="md:col-span-2 rounded overflow-hidden">
          <div className="bg-primary text-base-100 text-center py-4">
            <h2 className="text-xl font-semibold mb-1">
              {subjectId
                ? writtens?.length > 0 && writtens[0]?.subject?.name
                : chapterId &&
                  writtens?.length > 0 &&
                  writtens[0]?.chapter?.name}
            </h2>
            <p className="text-sm">
              {writtens?.length > 0 && writtens[0]?.class?.name}
              {!subjectId &&
                writtens?.length > 0 &&
                " - " + writtens[0]?.subject?.name}{" "}
              | NCTB BOOK
            </p>
          </div>

          <div className="p-2 bg-base-100 flex justify-center gap-3 uppercase text-[10px] font-semibold">
            <Link
              to={`/academy/subject-${subjectNewId}/chapters`}
              className="bg-gray-100 px-4 py-2 rounded hover:bg-primary hover:text-base-100 duration-300"
            >
              view chapter
            </Link>
            <Link
              to={`/academy/mcq?subject=${subjectNewId}`}
              className="bg-gray-100 px-4 py-2 rounded hover:bg-primary
              hover:text-base-100 duration-300"
            >
              view MCQ
            </Link>
          </div>

          <div className="mt-4">
            <ul className="flex flex-col gap-6">
              {writtens?.map((written, i) => (
                <WrittenCard key={written?._id} written={written} i={i} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
