import { FaVideo } from "react-icons/fa";
import { MdArrowRight } from "react-icons/md";
import VideoModal from "../McqF/VideoModal";
import { useEffect, useState } from "react";
import moment from "moment";
import perser from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import { useGetSingleAcademyMCQQuery } from "../../../../Redux/api/academy/mcqApi";
import { FaCircleCheck } from "react-icons/fa6";
import { CgEditBlackPoint } from "react-icons/cg";
import Spinner from "../../../../Components/Loader/Spinner/Spinner";
import RelatedMcqs from "./RelatedMcqs";

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebook,
  FaTelegram,
  FaLinkedin,
  FaWhatsappSquare,
  FaShareAlt,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function McqDetails() {
  const { id } = useParams();
  const [modal, setModal] = useState(false);

  const { data, isLoading } = useGetSingleAcademyMCQQuery(id);
  const mcq = data?.data;

  const [shareDropdown, setShareDropdown] = useState(false);


  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".sharebtn")) {
        setShareDropdown(null);
      }
    });
  }, [shareDropdown]);

  const createdAt = mcq?.createdAt;
  const updatedAt = mcq?.updatedAt;
  const timeAgoCreatedAt = moment(createdAt).fromNow();
  const timeAgoUpdatedAt = moment(updatedAt).fromNow();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="bg-base-100 shadow rounded">
          <div className="border-b p-3">
            <h2 className="text-primary font-semibold text-[15px] flex items-start gap-1">
              {mcq?.question && perser(mcq?.question)}
            </h2>
            <p className="text-[11px] text-neutral-content mt-1">
              Created: {timeAgoCreatedAt} | Updated: {timeAgoUpdatedAt}
            </p>
          </div>

          <div className="p-4 border-b">
            <div className="grid grid-cols-2 gap-2 text-[15px]">
              {mcq?.points?.map((point, i) => (
                <p key={i} className="flex items-center gap-2">
                  {point?.name == mcq?.ans ? (
                    <FaCircleCheck className="text-sm text-primary" />
                  ) : (
                    <CgEditBlackPoint className="text-base" />
                  )}
                  <span
                    className={`${point?.name == mcq?.ans && "text-primary"}`}
                  >
                    {point?.title && perser(point?.title)}
                  </span>
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center p-3 text-sm">
            <div>
              <button className="text-primary flex items-center">
                ব্যাখ্যা <MdArrowRight className="text-2xl" />
              </button>
            </div>
            <div className="flex items-center gap-6 text-neutral-content">
              <button onClick={() => setModal(true)}>
                <FaVideo className="text-lg" />
              </button>
              <VideoModal modal={modal} setModal={setModal} />
              <div className="text-sm relative">
                <button
                  onClick={() => setShareDropdown(!shareDropdown)}
                  title="Share"
                  className="sharebtn"
                >
                  <FaShareAlt />
                </button>

                {shareDropdown && (
                  <div className="absolute right-0 top-5 min-w-40 px-3 py-2 rounded bg-base-100 shadow">
                    <div className="flex items-center gap-2">
                      <p>share:</p>
                      <div className="mt-2 sm:mt-0 flex gap-2">
                        <FacebookShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/academy/mcq/${mcq?._id}`}
                        >
                          <FaFacebook className="text-xl text-blue-600" />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/academy/mcq/${mcq?._id}`}
                        >
                          <FaSquareXTwitter className="text-xl" />
                        </TwitterShareButton>
                        <TelegramShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/academy/mcq/${mcq?._id}`}
                        >
                          <FaTelegram className="text-xl text-sky-500" />
                        </TelegramShareButton>
                        <LinkedinShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/academy/mcq/${mcq?._id}`}
                        >
                          <FaLinkedin className="text-xl text-sky-400" />
                        </LinkedinShareButton>
                        <WhatsappShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/academy/mcq/${mcq?._id}`}
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

          <div className={`border-t text-xs p-4`}>
            {mcq?.explain && perser(mcq?.explain)}
          </div>
        </div>

        <div className="mt-4">
          <div className="bg-gray-300 text-primary p-4 rounded-t">
            <div className="flex justify-between items-center">
              <h2 className="text-lg">Related Question</h2>
              <Link
                to={`/academy/mcq?subject=${mcq?.subject}`}
                className="bg-gray-100 rounded px-4 py-2 text-xs text-neutral hover:text-primary hover:bg-base-100"
              >
                View More
              </Link>
            </div>
          </div>

          <RelatedMcqs category={mcq?.category} subject={mcq?.subject} />
        </div>
      </div>
    </div>
  );
}
