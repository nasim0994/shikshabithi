import { FaEye, FaHeart, FaShareAlt, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import perser from "html-react-parser";
import moment from "moment";
import { useState } from "react";
import { MdArrowRight } from "react-icons/md";

export default function WrittenCard({ written, i }) {
  const [explan, setExplan] = useState();

  const createdAt = written?.createdAt;
  const updatedAt = written?.updatedAt;
  const timeAgoCreatedAt = moment(createdAt).fromNow();
  const timeAgoUpdatedAt = moment(updatedAt).fromNow();

  return (
    <li className="bg-base-100 shadow rounded p-4">
      <div className="border-b p-3">
        <Link
          to=""
          className="hover:text-secondary duration-300 font-semibold text-[15px] flex items-start gap-1"
        >
          {i + 1}. {written?.question && perser(written?.question)}
        </Link>
        <p className="text-[11px] text-neutral-content mt-1">
          Created: {timeAgoCreatedAt} | Updated: {timeAgoUpdatedAt}
        </p>
      </div>

      <div className="p-4 border-b">{written?.ans && perser(written?.ans)}</div>

      <div className="flex justify-between items-center p-3 text-sm">
        <div>
          <button
            onClick={() => setExplan(!explan)}
            className="text-secondary flex items-center"
          >
            ব্যাখ্যা <MdArrowRight className="text-2xl" />
          </button>
        </div>

        <div className="flex items-center gap-6 text-neutral-content">
          <button>
            <FaVideo className="text-lg" />
          </button>
          {/* <VideoModal modal={modal} setModal={setModal} /> */}
          <button className="flex items-center gap-1">
            <FaHeart /> <span className="text-sm">00</span>
          </button>
          <div className="flex items-center gap-1">
            <FaEye className="text-lg" />
            <span className="text-sm">00</span>
          </div>
          <button className="flex items-center gap-1 text-secondary">
            <FaShareAlt />
          </button>
        </div>
      </div>

      <div
        className={`bg-primary/20 w-full text-xs h-0 overflow-hidden duration-300 ${
          explan && "h-auto p-4"
        }`}
      >
        {perser(written?.explain)}
      </div>
    </li>
  );
}
