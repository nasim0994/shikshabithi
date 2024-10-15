import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import moment from "moment";
import AcademySkeleton from "../../../Components/Skeleton/AcademySkeleton";
import {
  useDeleteHandNoteMutation,
  useGetHandNotesQuery,
} from "../../../Redux/api/handnotesApi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

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

export default function Notes({ activeCategory, selectedSubject }) {
  const { loggedUser } = useSelector((store) => store.user);
  const [optionDropdown, setOptionDropdown] = useState(null);
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

  const handelToggle = (i) => {
    if (optionDropdown === i) {
      return setOptionDropdown(null);
    }
    setOptionDropdown(i);
  };

  let query = {};
  query["category"] =
    activeCategory == 1
      ? "academy"
      : activeCategory == 2
      ? "admission"
      : activeCategory == 3
      ? "job"
      : "others";
  query["subject"] = selectedSubject;
  query["status"] = "active";

  const { data, isLoading } = useGetHandNotesQuery({ ...query });
  const handnotes = data?.data;

  // Handle Delete
  const [deleteHandNote] = useDeleteHandNoteMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this item?");
    if (isConfirm) {
      let res = await deleteHandNote(id);
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
      {handnotes?.length > 0 ? (
        handnotes?.map((handnote, i) => (
          <div key={handnote?._id} className="bg-base-100 shadow rounded">
            <div className="p-2 border-b flex justify-between items-center">
              <div className="flex items-start gap-2">
                <img
                  src={
                    handnote?.user?.profile?.image
                      ? `${import.meta.env.VITE_API_URL}/user/image/${
                          handnote?.user?.profile?.image
                        }`
                      : `/images/demo_user.png`
                  }
                  alt=""
                  className="w-10 h-10 rounded"
                />
                <div>
                  <h3 className="text-neutral text-[15px] font-medium">
                    {handnote?.user?.profile?.name}
                  </h3>
                  <p className="text-xs text-neutral-content">
                    {moment(handnote?.createdAt).fromNow()}
                  </p>
                </div>
              </div>

              {loggedUser?.data?._id === handnote?.user?._id && (
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
                          to={`/handnote/edit/${handnote?._id}`}
                          className="px-2 py-1 block rounded hover:bg-gray-100"
                        >
                          Edit HandNote
                        </Link>
                        <button
                          onClick={() => handleDelete(handnote?._id)}
                          className="px-2 py-1 block w-full text-start rounded hover:bg-gray-100"
                        >
                          Delete HandNote
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-b">
              <Link
                to={`/handnotes/${handnote?._id}`}
                className="text-neutral hover:text-primary duration-200 inline-block"
              >
                <h2 className="text-[13px] font-semibold">{handnote?.title}</h2>
              </Link>

              <p className="text-xs text-neutral-content">
                {handnote?.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <PhotoProvider>
                  {handnote?.images?.slice(0, 2)?.map((img, i) => (
                    <PhotoView
                      key={i}
                      src={`${import.meta.env.VITE_API_URL}/handnotes/${img}`}
                    >
                      <img
                        src={`${import.meta.env.VITE_API_URL}/handnotes/${img}`}
                        alt=""
                        className="w-full h-28 sm:h-60 border rounded mt-2"
                      />
                    </PhotoView>
                  ))}
                </PhotoProvider>
              </div>

              <div className="flex justify-between pt-4 pb-1 items-center">
                <div className=" flex gap-2">
                  <p className="px-2 py-[3px] bg-primary/5 text-[10px] rounded">
                    {handnote?.subject?.name}
                  </p>

                  {handnote?.chapter && (
                    <p className="px-2 py-[3px] bg-primary/5 text-[10px] rounded">
                      {handnote?.chapter?.name}
                    </p>
                  )}
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
                            }/handnotes/${handnote?._id}`}
                          >
                            <FaFacebook className="text-xl text-blue-600" />
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={`${
                              import.meta.env.VITE_FRONTEND_URL
                            }/handnotes/${handnote?._id}`}
                          >
                            <FaSquareXTwitter className="text-xl" />
                          </TwitterShareButton>
                          <TelegramShareButton
                            url={`${
                              import.meta.env.VITE_FRONTEND_URL
                            }/handnotes/${handnote?._id}`}
                          >
                            <FaTelegram className="text-xl text-sky-500" />
                          </TelegramShareButton>
                          <LinkedinShareButton
                            url={`${
                              import.meta.env.VITE_FRONTEND_URL
                            }/handnotes/${handnote?._id}`}
                          >
                            <FaLinkedin className="text-xl text-sky-400" />
                          </LinkedinShareButton>
                          <WhatsappShareButton
                            url={`${
                              import.meta.env.VITE_FRONTEND_URL
                            }/handnotes/${handnote?._id}`}
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
        ))
      ) : (
        <p className="text-xs text-red-500">No Available Handnote</p>
      )}
    </div>
  );
}
