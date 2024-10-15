import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import perser from "html-react-parser";

import { FaCheckCircle, FaShareAlt } from "react-icons/fa";
import { FaEye, FaHeart } from "react-icons/fa6";
import { MdArrowRight, MdOutlineClose } from "react-icons/md";
import { CgEditBlackPoint } from "react-icons/cg";
import { FaCheck } from "react-icons/fa6";

export default function MCQ({ question, i }) {
  const [explan, setExplan] = useState();
  const mcq = question?.mcq;

  const createdAt = mcq?.createdAt;
  const updatedAt = mcq?.updatedAt;
  const timeAgoCreatedAt = moment(createdAt).fromNow();
  const timeAgoUpdatedAt = moment(updatedAt).fromNow();

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="border-b p-3 bg-primary/20 rounded-t">
        <Link
          to={`/academy/mcq/${mcq?._id}`}
          className="hover:text-secondary duration-300 font-semibold text-[15px] flex items-start gap-1"
        >
          {i + 1}. {mcq?.question && perser(mcq?.question)}
        </Link>
        <p className="text-[11px] text-neutral-content mt-1">
          Created: {timeAgoCreatedAt} | Updated: {timeAgoUpdatedAt}
        </p>
      </div>

      {/* points */}
      <div className="p-4 pb-2 border-b">
        <div className="grid grid-cols-2 gap-2 text-[15px]">
          {mcq?.points?.map((point, i) => (
            <div key={i} className="flex items-center gap-2">
              {point?.name == question?.selectedAns ? (
                <FaCheckCircle className="text-sm" />
              ) : (
                <CgEditBlackPoint className="text-base" />
              )}

              {point?.name == mcq?.ans ? (
                <span className="text-green-500">
                  {point?.title && perser(point?.title)}
                </span>
              ) : point?.name == question?.selectedAns &&
                question?.selectedAns != mcq?.ans ? (
                <span className="text-red-500">
                  {point?.title && perser(point?.title)}
                </span>
              ) : (
                <span>{point?.title && perser(point?.title)}</span>
              )}

              {point?.name == question?.selectedAns &&
              question?.selectedAns == mcq?.ans ? (
                <FaCheck className="text-sm text-green-500" />
              ) : (
                point?.name == question?.selectedAns &&
                question?.selectedAns !== mcq?.ans && (
                  <MdOutlineClose className="text-base text-red-500" />
                )
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium">
          {mcq?.tags?.map((tag) => (
            <span key={tag?._id} className="bg-primary/5 p-1 rounded">
              {tag?.name}
            </span>
          ))}
        </div>
      </div>

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
        {mcq?.explain && perser(mcq?.explain)}
      </div>
    </div>
  );
}
