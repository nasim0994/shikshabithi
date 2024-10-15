import { Link } from "react-router-dom";
import { FaUsers, FaEye, FaQuestionCircle } from "react-icons/fa";
import { BsBookmarksFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { FaMinusCircle, FaAward } from "react-icons/fa";
import { useGetAdmissionModelTestQuery } from "../../../../Redux/api/admission/admissionModelTestApi";
import AdmissionSet from "../../../../Components/Skeleton/AdmissionSet";
import { useEffect, useState } from "react";
import ModelTestModal from "../../../../Components/UserLayoutComponents/Exam/ModelTestModal/ModelTestModal";

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

export default function AdmissionExam() {
  const [modelModal, setModelModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState({});

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

  const { data, isLoading } = useGetAdmissionModelTestQuery();
  let academyModelTest = data?.data;

  if (isLoading) return <AdmissionSet />;

  return (
    <div className="mt-2 flex flex-col gap-3">
      {academyModelTest?.map((modelTest, i) => (
        <div key={modelTest?._id} className="bg-base-100 rounded relative">
          <div className="p-3">
            <div
              className={`absolute top-0 right-0 rounded-tr text-base-100 text-[11px] py-1 px-2 font-medium capitalize ${
                modelTest?.status == "active" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {modelTest?.status}
            </div>

            <div className="flex items-center gap-4">
              <Link to={`/exam-list/admission/${modelTest?._id}`}>
                <h2 className="text-primary text-lg font-semibold hover:text-green-500 duration-300">
                  {modelTest?.name}
                </h2>
              </Link>
            </div>

            <div className="mt-1 flex gap-1 sm:gap-4 flex-wrap text-[11px] text-neutral-content">
              <p>{modelTest?.university?.name}</p>
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
            {modelTest?.examType == "free" ? (
              <div>
                <button
                  onClick={() => {
                    setModelModal(true);
                    setSelectedModel(modelTest);
                  }}
                  className="bg-green-500  hover:bg-green-600 text-base-100 px-2 py-1 rounded duration-200"
                >
                  Start Now
                </button>

                <ModelTestModal
                  model={selectedModel}
                  modelModal={modelModal}
                  setModelModal={setModelModal}
                  category="admission"
                />
              </div>
            ) : (
              <Link
                to="/packages"
                className="bg-red-500 hover:bg-red-600 text-base-100 px-2 py-1 rounded duration-200"
              >
                Buy Package
              </Link>
            )}

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
                          }/exam-list/admission/${modelTest?._id}`}
                        >
                          <FaFacebook className="text-xl text-blue-600" />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/exam-list/admission/${modelTest?._id}`}
                        >
                          <FaSquareXTwitter className="text-xl" />
                        </TwitterShareButton>
                        <TelegramShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/exam-list/admission/${modelTest?._id}`}
                        >
                          <FaTelegram className="text-xl text-sky-500" />
                        </TelegramShareButton>
                        <LinkedinShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/exam-list/admission/${modelTest?._id}`}
                        >
                          <FaLinkedin className="text-xl text-sky-400" />
                        </LinkedinShareButton>
                        <WhatsappShareButton
                          url={`${
                            import.meta.env.VITE_FRONTEND_URL
                          }/exam-list/admission/${modelTest?._id}`}
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
