import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaEye, FaQuestionCircle } from "react-icons/fa";
import { BsBookmarksFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { FaMinusCircle, FaAward } from "react-icons/fa";
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

import { useGetExamModelTestQuery } from "../../../../Redux/api/academy/academyModelTestApi";
import AdmissionSet from "../../../../Components/Skeleton/AdmissionSet";

import ModeltestStartBtn from "./ModeltestStartBtn";

export default function AcademyExam({ packageData, modelTestAttendLength }) {
  const [shareDropdown, setShareDropdown] = useState(null);

  const handelshare = (i) => {
    if (shareDropdown == i) {
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

  const { data, isLoading } = useGetExamModelTestQuery();
  let academyModelTest = data?.data;

  if (isLoading) return <AdmissionSet />;

  return (
    <div className="mt-2 flex flex-col gap-2">
      {academyModelTest?.map((modelTest, i) => (
        <div key={modelTest?._id} className="bg-base-100 rounded relative">
          <div className="p-3">
            <div
              className={`absolute top-0 right-0 rounded-tr text-base-100 text-[11px] py-1 px-2 font-medium capitalize ${
                modelTest?.examType == "free" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {modelTest?.examType}
            </div>

            <div className="flex items-center gap-4">
              <Link to={`/exam-list/academy/${modelTest?._id}`}>
                <h3 className="text-primary font-semibold hover:text-green-500 duration-300">
                  {modelTest?.name}
                </h3>
              </Link>

              <p className="text-[11px] font-medium bg-gray-100 px-1.5 py-[2px] rounded">
                {modelTest?.subject?.name}
              </p>
            </div>

            <div className="mt-1 flex gap-1 sm:gap-4 flex-wrap text-[11px] text-neutral-content">
              <p>{modelTest?.class?.name}</p>
              <p className="flex items-center gap-1">
                <FaUsers />
                {modelTest?.participated} participated
              </p>
              <p>Vendor: {modelTest?.vendor}</p>
            </div>

            <div className="mt-1 flex flex-wrap gap-1 sm:gap-2 text-neutral/60">
              <div className="text-[11px] font-medium bg-primary/5 px-2 py-[3px] rounded flex items-center gap-1">
                <FaQuestionCircle /> {modelTest?.mcqs?.length} Ques.
              </div>
              <div className="text-[11px] font-medium bg-primary/5 px-2 py-[3px] rounded flex items-center gap-1">
                <BsBookmarksFill /> {modelTest?.totalMark} Marks
              </div>
              <div className="text-[11px] font-medium bg-primary/5 px-2 py-[3px] rounded flex items-center gap-1">
                <IoIosTime /> {modelTest?.duration} Mins
              </div>
              <div className="text-[11px] font-medium bg-primary/5 px-2 py-[3px] rounded flex items-center gap-1">
                <FaAward /> {modelTest?.passMark} Pass Mark
              </div>
              <div className="text-[11px] font-medium bg-primary/5 px-2 py-[3px] rounded flex items-center gap-1">
                <FaMinusCircle /> {modelTest?.negativeMark} Negative mark
              </div>
            </div>
          </div>

          <div className="border-t p-3 flex justify-between items-center text-xs font-medium">
            <ModeltestStartBtn
              packageData={packageData}
              modelTestAttendLength={modelTestAttendLength}
              modelTest={modelTest}
              category="academy"
            />

            <div className="flex gap-2 items-center">
              <Link
                to={`/exam-list/academy/${modelTest?._id}`}
                className="flex items-center gap-2 bg-primary/15 px-3 py-2 rounded"
              >
                <FaEye className="text-sm" />
                View Details
              </Link>
              <div className="text-sm relative">
                <button
                  onClick={() => {
                    handelshare(i);
                  }}
                  title="Share"
                  className="sharebtn bg-primary/15 px-3 py-2 rounded"
                >
                  <FaShareAlt />
                </button>

                {shareDropdown == i && (
                  <div className="absolute right-0 top-10 z-10 min-w-40 px-3 py-2 rounded bg-base-100 shadow">
                    <div className="flex items-center gap-2">
                      <p>share:</p>
                      <div className="mt-2 sm:mt-0 flex gap-2">
                        <FacebookShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/exam-list/academy/${modelTest?._id}`}
                        >
                          <FaFacebook className="text-xl text-blue-600" />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/exam-list/academy/${modelTest?._id}`}
                        >
                          <FaSquareXTwitter className="text-xl" />
                        </TwitterShareButton>
                        <TelegramShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/exam-list/academy/${modelTest?._id}`}
                        >
                          <FaTelegram className="text-xl text-sky-500" />
                        </TelegramShareButton>
                        <LinkedinShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/exam-list/academy/${modelTest?._id}`}
                        >
                          <FaLinkedin className="text-xl text-sky-400" />
                        </LinkedinShareButton>
                        <WhatsappShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/exam-list/academy/${modelTest?._id}`}
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
        </div>
      ))}
    </div>
  );
}
