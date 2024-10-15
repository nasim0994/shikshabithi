import { FaPrint } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";
// import { useGetBoardMcqsQuery } from "../../../Redux/api/board/boardMcqApi";
// import { useGetBoardWrittensQuery } from "../../../Redux/api/board/boardWrittenApi";

export default function ClassCard({ cls }) {
  //   const classId = cls?._id;
  //   let query = {};
  //   query["cls"] = classId;
  //   const { data } = useGetBoardMcqsQuery({ ...query });
  //   const boardMcqs = data?.data;

  //   let wquery = {};
  //   wquery["cls"] = classId;
  //   const { data: wdata } = useGetBoardWrittensQuery({ ...wquery });
  //   const boardWrittens = wdata?.data;

  return (
    <div className="bg-base-100 rounded shadow border-l-2 border-secondary p-4 flex justify-between items-start hover:bg-primary/5 duration-300">
      <div>
        <Link
          to={`/academy/class-${cls?._id}/subjects`}
          className="flex items-center gap-2 text-neutral hover:text-primary duration-300"
        >
          <SiGoogleclassroom className="text-lg" />
          <h2 className="text-[15px]">{cls?.name}</h2>
        </Link>
        <div className="mt-1 ml-6 text-[10px] flex gap-1">
          <Link
            to={`/exam-list?active=academy`}
            className="border rounded px-2 py-1 hover:bg-base-100 duration-200"
          >
            Model Test
          </Link>

          <Link
            to={`/academy/mcq?class=${cls?._id}`}
            className="border rounded px-2 py-1 hover:bg-base-100 duration-200"
          >
            MCQ
          </Link>

          {cls?.category?.uuid !== "101" && cls?.category?.uuid !== "102" && (
            <Link
              to={`/academy/board-exam/mcq?class=${cls?._id}`}
              className="border rounded px-2 py-1 hover:bg-base-100 duration-200"
            >
              Board Exam
              {/* {boardMcqs?.length && boardWrittens?.length
                ? parseInt(boardMcqs?.length + boardWrittens?.length)
                : 0} */}
            </Link>
          )}
        </div>
      </div>
      <div>
        <button className="text-xs text-neutral bg-slate-50 hover:bg-base-100 px-2 py-1 rounded flex items-center gap-1">
          <FaPrint /> Print
        </button>
      </div>
    </div>
  );
}
