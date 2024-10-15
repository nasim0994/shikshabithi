import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAcademyMCQQuery } from "../../../../Redux/api/academy/mcqApi";
import ExamInfoModal from "../OnDemandTest/ExamInfoModal";

export default function ChapterDropdown({
  selectedChapter,
  dropdown,
  chapter,
}) {
  const [examInfoModal, setExamInfoModal] = useState(false);

  let query = {};
  query["chapter"] = selectedChapter;
  const { data: mcq } = useGetAcademyMCQQuery({ ...query });
  const mcqs = mcq?.data;

  return (
    <div
      className={`absolute z-40 right-0 uppercase min-w-28 bg-base-100 text-neutral-content text-[12.5px] text-center shadow ${
        dropdown && selectedChapter == chapter?._id
          ? "top-6 opacity-100 visible"
          : "top-10 invisible opacity-0"
      } duration-300`}
    >
      <Link
        to={`/academy/chapter-${chapter?._id}/content`}
        className="px-2 py-1.5 block hover:bg-primary duration-300 hover:text-base-100 border-b"
      >
        Reed
      </Link>

      <div
        onClick={() => setExamInfoModal(true)}
        className="chapter_test cursor-pointer px-2 py-1.5 hover:bg-primary duration-300 hover:text-base-100 border-b"
      >
        TEST
      </div>

      {/* model */}
      <ExamInfoModal
        examInfoModal={examInfoModal}
        setExamInfoModal={setExamInfoModal}
        mcqs={mcqs}
        chapter={selectedChapter}
      />

      <Link
        to={`/academy/mcq?chapter=${chapter?._id}`}
        className="px-2 py-1.5 block hover:bg-primary duration-300 hover:text-base-100 border-b"
      >
        MCq
      </Link>

      <Link
        to={`/academy/written?chapter=${chapter?._id}`}
        className="px-2 py-1.5 block hover:bg-primary duration-300 hover:text-base-100 border-b"
      >
        Written
      </Link>
    </div>
  );
}
