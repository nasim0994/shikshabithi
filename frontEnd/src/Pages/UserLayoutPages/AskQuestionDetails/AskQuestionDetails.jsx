import { useParams } from "react-router-dom";
import BackBtn from "../../../Components/BackBtn/BackBtn";
import { useGetAskQuestionQuery } from "../../../Redux/api/askQuestionApi";
import moment from "moment";
import perser from "html-react-parser";

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
import { useEffect, useState } from "react";

export default function AskQuestionDetails() {
  const { id } = useParams();
  const { data } = useGetAskQuestionQuery(id);
  const question = data?.data;

  const [shareDropdown, setShareDropdown] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".sharebtn")) {
        setShareDropdown(null);
      }
    });
  }, [shareDropdown]);

  let createdAt = question?.createdAt;
  const timeAgoCreatedAt = moment(createdAt).fromNow();

  const details = question?.details && perser(question?.details);

  return (
    <div>
      <div className="bg-base-100 shadow rounded p-3">
        <div className="flex justify-between items-center">
          <button className="text-sm primary_btn">Ask Question?</button>
          <BackBtn />
        </div>
      </div>

      <div className="mt-2 bg-base-100 shadow rounded ">
        <div className="p-3 border-b">
          <h2 className="text-[13px] font-semibold">{question?.question}</h2>
          <p className="mt-1 text-xs text-neutral-content">
            Created: {timeAgoCreatedAt}
          </p>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <img
                src={
                  question?.user?.profile?.image
                    ? `${import.meta.env.VITE_API_URL}/user/image/${
                        question?.user?.profile?.image
                      }`
                    : `/images/demo_user.png`
                }
                alt=""
                className="w-11 h-11 rounded"
              />
              <div>
                <p className="text-xs text-neutral-content">asked by</p>
                <h2 className="text-neutral">
                  {question?.user?.profile?.name}
                </h2>
              </div>
            </div>
            <div className="text-base relative">
              <button
                onClick={() => setShareDropdown(!shareDropdown)}
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
                        url={`${import.meta.env.VITE_FRONTEND_URL}/discussion/${
                          question?._id
                        }`}
                      >
                        <FaFacebook className="text-xl text-blue-600" />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={`${import.meta.env.VITE_FRONTEND_URL}/discussion/${
                          question?._id
                        }`}
                      >
                        <FaSquareXTwitter className="text-xl" />
                      </TwitterShareButton>
                      <TelegramShareButton
                        url={`${import.meta.env.VITE_FRONTEND_URL}/discussion/${
                          question?._id
                        }`}
                      >
                        <FaTelegram className="text-xl text-sky-500" />
                      </TelegramShareButton>
                      <LinkedinShareButton
                        url={`${import.meta.env.VITE_FRONTEND_URL}/discussion/${
                          question?._id
                        }`}
                      >
                        <FaLinkedin className="text-xl text-sky-400" />
                      </LinkedinShareButton>
                      <WhatsappShareButton
                        url={`${import.meta.env.VITE_FRONTEND_URL}/discussion/${
                          question?._id
                        }`}
                      >
                        <FaWhatsappSquare className="text-xl text-green-500" />
                      </WhatsappShareButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 text-sm">
            <div>{details}</div>

            {question?.image && (
              <div className="mt-2 text-sm">
                <img
                  src={`${import.meta.env.VITE_API_URL}/askQuestion/${
                    question?.image
                  }`}
                  alt=""
                  className="w-[80%] border rounded mt-2"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
