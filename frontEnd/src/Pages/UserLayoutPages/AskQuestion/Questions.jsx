import {
  useDeleteAskQuestionMutation,
  useGetAskQuestionsQuery,
} from "../../../Redux/api/askQuestionApi";
import { useEffect, useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaPlusSquare, FaShareAlt } from "react-icons/fa";
import AddAnsModal from "./AddAnsModal";
import moment from "moment";
import { useGetAskAnsQuery } from "../../../Redux/api/askAnsApi";
import perser from "html-react-parser";
import AcademySkeleton from "../../../Components/Skeleton/AcademySkeleton";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";

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
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Questions({ activeCategory, selectedSubject }) {
  const { loggedUser } = useSelector((store) => store.user);
  const [optionDropdown, setOptionDropdown] = useState(null);
  const [shareDropdown, setShareDropdown] = useState(null);

  const handelToggle = (i) => {
    if (optionDropdown === i) {
      return setOptionDropdown(null);
    }
    setOptionDropdown(i);
  };

  let questionquery = {};
  questionquery["category"] =
    activeCategory == 1
      ? "academy"
      : activeCategory == 2
      ? "admission"
      : activeCategory == 3
      ? "job"
      : "others";
  questionquery["subject"] = selectedSubject;
  questionquery["status"] = "active";

  const { data, isLoading } = useGetAskQuestionsQuery({ ...questionquery });
  const questions = data?.data;

  const [ans, setAns] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const handelToggleAns = (i) => {
    if (ans === i) {
      return setAns(null);
    }
    setAns(i);
  };

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
  }, [selectedQuestion]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".o_btn")) {
        setOptionDropdown(null);
      }
    });
  }, [selectedQuestion]);

  let query = {};
  query["question"] = selectedQuestion;
  const { data: ansData } = useGetAskAnsQuery({
    ...query,
  });
  const allAns = ansData?.data;

  const [deleteAskQuestion] = useDeleteAskQuestionMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this item?");
    if (isConfirm) {
      let res = await deleteAskQuestion(id);
      if (res?.data?.success) {
        toast.success("Delete success");
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    }
  };

  if (isLoading) return <AcademySkeleton />;

  return (
    <div className="mt-2 flex flex-col gap-2">
      {questions?.length > 0 ? (
        questions?.map((question, i) => (
          <div key={question?._id} className="bg-base-100 shadow rounded">
            <div className="p-2 border-b flex justify-between items-center">
              <div className="flex items-start gap-2">
                <img
                  src={
                    question?.user?.profile?.image
                      ? `${import.meta.env.VITE_BACKEND_URL}/user/image/${
                          question?.user?.profile?.image
                        }`
                      : `/images/demo_user.png`
                  }
                  alt=""
                  className="w-9 h-9 rounded"
                />
                <div>
                  <h3 className="text-neutral text-sm font-medium">
                    {question?.user?.profile?.name}
                  </h3>
                  <p className="text-xs text-neutral-content">
                    {moment(question?.createdAt).fromNow()}
                  </p>
                </div>
              </div>

              {loggedUser?.data?._id === question?.user?._id && (
                <div className="relative">
                  <button className="o_btn" onClick={() => handelToggle(i)}>
                    <BsThreeDotsVertical className="text-neutral text-lg bg-gray-100 p-1 rounded" />
                  </button>

                  {optionDropdown == i && (
                    <div className="absolute top-6 right-0 min-w-32 rounded bg-base-100 shadow-lg p-1">
                      <div className="text-[12px] text-neutral-content">
                        <p className="px-1 py-1 border-b mb-1 text-neutral-content/90">
                          Options
                        </p>
                        <Link
                          to={`/ask-question/edit/${question?._id}`}
                          className="px-2 py-1 block rounded hover:bg-gray-100"
                        >
                          Edit Question
                        </Link>
                        <button
                          onClick={() => handleDelete(question?._id)}
                          className="px-2 py-1 block w-full text-start rounded hover:bg-gray-100"
                        >
                          Delete Question
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-b">
              <Link
                to={`/discussion/${question?._id}`}
                className="text-neutral hover:text-primary duration-200 inline-block"
              >
                <h2 className="text-[13px] font-semibold">
                  {question?.question}
                </h2>
              </Link>

              {question?.image && (
                <div className="mt-2 text-sm">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/askQuestion/${
                      question?.image
                    }`}
                    alt=""
                    className="w-[80%] sm:w-[50%] h-28 sm:h-60 border rounded mt-2"
                  />
                </div>
              )}

              <div className="mt-2 flex gap-2">
                <p className="px-2 py-[3px] bg-primary/5 text-[10px] rounded">
                  {question?.subject?.name}
                </p>

                {question?.chapter && (
                  <p className="px-2 py-[3px] bg-primary/5 text-[10px] rounded">
                    {question?.chapter?.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="px-4 py-2 flex justify-between items-center">
                <div className="text-xs font-semibold text-primary flex items-center gap-1">
                  <button
                    onClick={() => {
                      handelToggleAns(i);
                      setSelectedQuestion(question?._id);
                    }}
                    className="text-primary flex items-center"
                  >
                    See Answers <MdArrowRight className="text-lg" />
                  </button>
                </div>
                <div className="text-sm relative">
                  <button
                    onClick={() => {
                      handelshare(i);
                    }}
                    className="sharebtn"
                  >
                    <FaShareAlt />
                  </button>

                  {shareDropdown == i && (
                    <div className="absolute right-0 top-5 min-w-40 px-3 py-2 rounded bg-base-100 shadow">
                      <div className="flex items-center gap-2">
                        <p>share:</p>
                        <div className="mt-2 sm:mt-0 flex gap-2">
                          <FacebookShareButton
                            url={`${
                              import.meta.env.VITE_FRONTEND_URL
                            }/discussion/${question?._id}`}
                          >
                            <FaFacebook className="text-xl text-blue-600" />
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={`${
                              import.meta.env.VITE_FRONTEND_URL
                            }/discussion/${question?._id}`}
                          >
                            <FaSquareXTwitter className="text-xl" />
                          </TwitterShareButton>
                          <TelegramShareButton
                            url={`${
                              import.meta.env.VITE_FRONTEND_URL
                            }/discussion/${question?._id}`}
                          >
                            <FaTelegram className="text-xl text-sky-500" />
                          </TelegramShareButton>
                          <LinkedinShareButton
                            url={`${
                              import.meta.env.VITE_FRONTEND_URL
                            }/discussion/${question?._id}`}
                          >
                            <FaLinkedin className="text-xl text-sky-400" />
                          </LinkedinShareButton>
                          <WhatsappShareButton
                            url={`${
                              import.meta.env.VITE_FRONTEND_URL
                            }/discussion/${question?._id}`}
                          >
                            <FaWhatsappSquare className="text-xl text-green-500" />
                          </WhatsappShareButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {ans == i && (
                <div className="border-t w-full px-3 py-2">
                  <div className="mb-4">
                    <button
                      onClick={() => {
                        setModal(true);
                        setSelectedQuestion(question?._id);
                      }}
                      className="flex items-center gap-2 rounded px-2 py-1.5 bg-primary text-base-100 duration-300 text-xs"
                    >
                      <FaPlusSquare /> Answer
                    </button>
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
                                  ? `${
                                      import.meta.env.VITE_BACKEND_URL
                                    }/user/image/${ans?.user?.profile?.image}`
                                  : `/images/demo_user.png`
                              }
                              alt=""
                              className="w-7 h-7 rounded"
                            />
                          </div>

                          <div className="text-[13px]">
                            {ans?.ans && perser(ans?.ans)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[13px] text-red-500">
                        No answer found.
                      </p>
                    )}
                  </div>

                  <AddAnsModal
                    question={selectedQuestion}
                    modal={modal}
                    setModal={setModal}
                  />
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-xs text-red-500">No Available Question</p>
      )}
    </div>
  );
}
