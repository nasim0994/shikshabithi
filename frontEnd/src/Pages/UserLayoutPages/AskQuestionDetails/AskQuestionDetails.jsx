import { FaHandPointRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import BackBtn from "../../../Components/BackBtn/BackBtn";
import { useGetAskQuestionQuery } from "../../../Redux/api/askQuestionApi";
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
import { useGetAskAnsQuery } from "../../../Redux/api/askAnsApi";
import AddAskQuestion from "../../../Components/UserLayoutComponents/AskQuestion/AddAskQuestion";

export default function AskQuestionDetails() {
  const { id } = useParams();
  const [shareDropdown, setShareDropdown] = useState(false);

  const { data } = useGetAskQuestionQuery(id);
  const question = data?.data;

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".sharebtn")) {
        setShareDropdown(null);
      }
    });
  }, [shareDropdown]);

  const details = question?.details && perser(question?.details);

  const { data: ansData } = useGetAskAnsQuery({ question: question?._id });
  const allAns = ansData?.data;

  return (
    <div>
      <div className="bg-base-100 shadow rounded p-3">
        <div className="flex justify-between items-center">
          <Link to="/ask-question/add" className="text-sm primary_btn">
            Ask Question?
          </Link>
          <BackBtn />
        </div>
      </div>

      <div className="mt-2 bg-base-100 shadow rounded ">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-2">
            <img
              src={
                question?.user?.profile?.image
                  ? `${import.meta.env.VITE_BACKEND_URL}/user/image/${
                      question?.user?.profile?.image
                    }`
                  : `/images/demo_user.png`
              }
              alt="user"
              className="w-10 h-10 rounded"
            />
            <div>
              <p className="text-xs text-neutral-content">asked by</p>
              <h2 className="text-neutral">{question?.user?.profile?.name}</h2>
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

        <div className="p-3">
          <div className="text-sm">
            <h2 className="text-2xl text-primary font-medium flex items-center gap-2">
              <FaHandPointRight />
              {question?.question}
            </h2>
            <div className="mt-4 ">{details}</div>

            {question?.image && (
              <div className="mt-2 text-sm">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/askQuestion/${
                    question?.image
                  }`}
                  alt="askQuestion"
                  className="w-[80%] border rounded mt-2"
                />
              </div>
            )}
          </div>
        </div>

        {/* Ans */}
        <div className="border-t w-full px-3 py-2">
          <div className="mb-4">
            <AddAskQuestion
              id={question?._id}
              selectedQuestion={question?._id}
            />
          </div>

          <div className="flex flex-col gap-2">
            {allAns?.length > 0 ? (
              allAns?.map((ans) => (
                <div
                  key={ans?._id}
                  className="flex items-start gap-2 border-b p-2"
                >
                  <div>
                    <img
                      src={
                        ans?.user?.profile?.image
                          ? `${import.meta.env.VITE_BACKEND_URL}/user/image/${
                              ans?.user?.profile?.image
                            }`
                          : `/images/demo_user.png`
                      }
                      alt="user"
                      className="w-7 h-7 rounded"
                    />
                  </div>

                  <div className="text-[13px]">
                    {ans?.ans && perser(ans?.ans)}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[13px] text-red-500">No answer found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
