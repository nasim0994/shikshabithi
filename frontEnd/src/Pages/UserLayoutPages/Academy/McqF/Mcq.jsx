import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import perser from "html-react-parser";

import {
  FaFacebook,
  FaLinkedin,
  FaShareAlt,
  FaTelegram,
  FaWhatsappSquare,
} from "react-icons/fa";
import { FaCircleCheck, FaSquareXTwitter, FaVideo } from "react-icons/fa6";
import { MdArrowRight } from "react-icons/md";
import { CgEditBlackPoint } from "react-icons/cg";
import VideoModal from "./VideoModal";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function Mcq({ mcq, i, page, limit }) {
  const [explan, setExplan] = useState();
  const [modal, setModal] = useState(false);

  const [shareDropdown, setShareDropdown] = useState(null);

  const handelshare = (i) => {
    if (shareDropdown === i) {
      return setShareDropdown(null);
    }
    setShareDropdown(i);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".sharebtn")) {
        setShareDropdown(null);
      }
    });
  }, [shareDropdown]);

  console.log(mcq);

  const createdAt = mcq?.createdAt;
  const updatedAt = mcq?.updatedAt;
  const timeAgoCreatedAt = moment(createdAt).fromNow();
  const timeAgoUpdatedAt = moment(updatedAt).fromNow();

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="border-b p-3">
        <Link
          to={`/academy/mcq/${mcq?._id}`}
          className="hover:text-secondary duration-300 font-semibold text-[15px] flex items-start gap-1"
        >
          {i + 1 + limit * (page - 1)}. {mcq?.question && perser(mcq?.question)}
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
              {point?.name == mcq?.ans ? (
                <FaCircleCheck className="text-sm text-blue-600" />
              ) : (
                <CgEditBlackPoint className="text-base" />
              )}
              <span className={`${point?.name == mcq?.ans && "text-blue-600"}`}>
                {point?.title && perser(point?.title)}
              </span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1 text-[11px] font-medium">
          {mcq?.tags?.map((tag) => (
            <Link
              key={tag?._id}
              to={`/academy/mcq?tag=${tag?._id}`}
              className="bg-primary/5 p-1 rounded"
            >
              {tag?.name}
            </Link>
          ))}
          {mcq?.sets?.map((set) => (
            <Link
              key={set?._id}
              to={`/academy/mcq?set=${set?._id}`}
              className="bg-primary/5 p-1 rounded"
            >
              {set?.name}
            </Link>
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
          <button onClick={() => setModal(true)}>
            <FaVideo className="text-lg" />
          </button>
          <VideoModal
            modal={modal}
            videoLink={mcq?.videoLink}
            setModal={setModal}
          />

          <div className="text-base flex items-center relative">
            <button onClick={() => handelshare(i)} className="sharebtn">
              <FaShareAlt />
            </button>

            {shareDropdown === i && (
              <div className="absolute right-5 top-0 min-w-40 px-3 py-2 rounded bg-black shadow">
                <div className="flex items-center gap-2">
                  <p>Share:</p>
                  <div className="mt-2 sm:mt-0 flex gap-2">
                    <FacebookShareButton
                      url={`${import.meta.env.VITE_FRONTEND_URL}/blog/${
                        mcq?._id
                      }`}
                    >
                      <FaFacebook className="text-xl text-blue-600" />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`${
                        import.meta.env.VITE_FRONTEND_URL
                      }/academy/board-exam/mcq/${mcq?._id}`}
                    >
                      <FaSquareXTwitter className="text-xl" />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={`${
                        import.meta.env.VITE_FRONTEND_URL
                      }/academy/board-exam/mcq/${mcq?._id}`}
                    >
                      <FaTelegram className="text-xl text-sky-500" />
                    </TelegramShareButton>
                    <LinkedinShareButton
                      url={`${
                        import.meta.env.VITE_FRONTEND_URL
                      }/academy/board-exam/mcq/${mcq?._id}`}
                    >
                      <FaLinkedin className="text-xl text-sky-400" />
                    </LinkedinShareButton>
                    <WhatsappShareButton
                      url={`${
                        import.meta.env.VITE_FRONTEND_URL
                      }/academy/board-exam/mcq/${mcq?._id}`}
                    >
                      <FaWhatsappSquare className="text-xl text-green-500" />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            )}
          </div>
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
