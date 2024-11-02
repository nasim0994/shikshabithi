import { Link } from "react-router-dom";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../../Redux/api/blogsApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BlogsSkeleton from "../../../Components/Skeleton/BlogsSkeleton";

import { MdArrowRight } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";

import Pagination from "../../../Components/Pagination/Pagination";

import { FaCommentAlt, FaEye, FaPlusSquare, FaShareAlt } from "react-icons/fa";
import AddCommentModal from "./AddCommentModal";
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
import Comments from "../../../Components/Comments/Comments";

export default function BlogsList({ activeCategory, selectedSubject }) {
  const { loggedUser } = useSelector((store) => store.user);
  const [optionDropdown, setOptionDropdown] = useState(null);
  const [shareDropdown, setShareDropdown] = useState(null);

  const [comment, setComment] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState("");

  const handelToggle = (i) => {
    if (optionDropdown === i) {
      return setOptionDropdown(null);
    }
    setOptionDropdown(i);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".o_btn")) {
        setOptionDropdown(null);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".sharebtn")) {
        setShareDropdown(null);
      }
    });
  }, [selectedBlog]);

  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    setSubject("");
    setChapter("");
    setTag("");
  }, [selectedSubject]);

  let blogLimit = 10;
  const [blogCurrentPage, setBlogCurrentPage] = useState(1);

  useEffect(() => {
    window.scroll(0, 0);
  }, [blogCurrentPage, subject, chapter, tag, selectedSubject]);

  let query = {};
  query["category"] =
    activeCategory == 1
      ? "academy"
      : activeCategory == 2
      ? "admission"
      : activeCategory == 3
      ? "job"
      : "others";
  query["subject"] = subject ? subject : selectedSubject;
  query["chapter"] = chapter;
  query["tag"] = tag;
  query["chapter"] = chapter;
  query["status"] = "active";
  query["limit"] = blogLimit;
  query["page"] = blogCurrentPage;
  const {
    data,
    isLoading: isBlogsLoading,
    isFetching,
  } = useGetBlogsQuery({ ...query });

  const blogs = data?.data;

  // Handle Delete
  const [deleteBlog] = useDeleteBlogMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this item?");
    if (isConfirm) {
      let res = await deleteBlog(id);
      if (res?.data?.success) {
        toast.success("Delete success");
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    }
  };

  const handelToggleComment = (i) => {
    if (comment === i) {
      return setComment(null);
    }
    setComment(i);
  };

  const handelshare = (i) => {
    if (shareDropdown == i) {
      return setShareDropdown(null);
    }
    setShareDropdown(i);
  };

  if (isBlogsLoading || isFetching) return <BlogsSkeleton />;

  return (
    <div className="lg:col-span-3">
      <div className="grid sm:grid-cols-2 gap-3 items-start">
        {blogs?.length > 0 ? (
          blogs?.map((blog, i) => (
            <div key={blog?._id} className="bg-base-100 shadow rounded">
              {blog?.image && (
                <Link to={`/blog/${blog?._id}`} className="text-sm">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/blogs/${
                      blog?.image
                    }`}
                    alt=""
                    className="rounded-t w-full max-h-64 min-h-48"
                  />
                </Link>
              )}

              <div className="p-3 flex justify-between items-center">
                <div>
                  <h3 className="text-neutral text-sm">
                    {blog?.user?.profile?.name}
                  </h3>
                  <p className="text-[10px] text-neutral-content">
                    {moment(blog?.createdAt).fromNow()}
                  </p>
                </div>

                {loggedUser?.data?._id === blog?.user?._id && (
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
                            to={`/blog/edit/${blog?._id}`}
                            className="px-2 py-1 block rounded hover:bg-gray-100"
                          >
                            Edit Blog
                          </Link>
                          <button
                            onClick={() => handleDelete(blog?._id)}
                            className="px-2 py-1 block w-full text-start rounded hover:bg-gray-100"
                          >
                            Delete Blog
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="px-3 pb-3">
                <Link
                  to={`/blog/${blog?._id}`}
                  className="text-neutral hover:text-primary duration-200 inline-block font-semibold"
                >
                  {blog?.title}
                </Link>

                <p className="text-xs text-neutral-content mt-1">
                  {blog?.details.replace(/<[^>]+>/g, "").slice(0, 200) + "..."}
                </p>

                <div className="flex justify-between mt-1">
                  <Link
                    to={`/blog/${blog?._id}`}
                    className="bg-primary/20 text-[9px] px-2 py-1 rounded text-primary font-semibold"
                  >
                    Reed More
                  </Link>
                </div>
              </div>

              <div className="p-2 pt-0">
                <div className="flex gap-2">
                  {blog?.subject && (
                    <p
                      onClick={() => {
                        setSubject(blog?.subject?._id);
                      }}
                      className="cursor-pointer px-2 py-[3px] bg-primary/5 text-[10px] rounded"
                    >
                      {blog?.subject?.name}
                    </p>
                  )}

                  {blog?.chapter && (
                    <p
                      onClick={() => {
                        setChapter(blog?.chapter?._id);
                      }}
                      className="cursor-pointer px-2 py-[3px] bg-primary/5 text-[10px] rounded"
                    >
                      {blog?.chapter?.name}
                    </p>
                  )}

                  {blog?.tags?.length > 0 &&
                    blog?.tags?.map((tag) => (
                      <p
                        onClick={() => {
                          setTag(tag?._id);
                        }}
                        key={tag?._id}
                        className="cursor-pointer px-2 py-[3px] bg-primary/5 text-[10px] rounded"
                      >
                        {tag?.name}
                      </p>
                    ))}
                </div>
              </div>

              <div className="border-t p-2 flex justify-between items-center">
                <div className="text-xs font-semibold text-primary flex items-center gap-1">
                  <button
                    onClick={() => {
                      handelToggleComment(i);
                      setSelectedBlog(blog?._id);
                    }}
                    className="text-primary flex items-center"
                  >
                    <FaCommentAlt /> <MdArrowRight className="text-lg" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <h4 className="flex gap-1 items-center font-semibold  text-neutral-content">
                    <FaEye /> {blog?.viewers?.length}
                  </h4>

                  <div className="relative">
                    <button
                      onClick={() => {
                        handelshare(i);
                        setSelectedBlog(blog?._id);
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
                              url={`${import.meta.env.VITE_FRONTEND_URL}/blog/${
                                blog?._id
                              }`}
                            >
                              <FaFacebook className="text-xl text-blue-600" />
                            </FacebookShareButton>
                            <TwitterShareButton
                              url={`${import.meta.env.VITE_FRONTEND_URL}/blog/${
                                blog?._id
                              }`}
                            >
                              <FaSquareXTwitter className="text-xl" />
                            </TwitterShareButton>
                            <TelegramShareButton
                              url={`${import.meta.env.VITE_FRONTEND_URL}/blog/${
                                blog?._id
                              }`}
                            >
                              <FaTelegram className="text-xl text-sky-500" />
                            </TelegramShareButton>
                            <LinkedinShareButton
                              url={`${import.meta.env.VITE_FRONTEND_URL}/blog/${
                                blog?._id
                              }`}
                            >
                              <FaLinkedin className="text-xl text-sky-400" />
                            </LinkedinShareButton>
                            <WhatsappShareButton
                              url={`${import.meta.env.VITE_FRONTEND_URL}/blog/${
                                blog?._id
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
              </div>

              {comment == i && (
                <div className="border-t w-full px-3 py-2">
                  <div className="mb-4">
                    <button
                      onClick={() => {
                        setModal(true);
                        setSelectedBlog(blog?._id);
                      }}
                      className="flex items-center gap-2 rounded px-2 py-1.5 bg-primary text-base-100 duration-300 text-xs"
                    >
                      <FaPlusSquare /> Comment
                    </button>
                  </div>

                  <Comments selectedBlog={selectedBlog} />

                  <AddCommentModal
                    blog={selectedBlog}
                    modal={modal}
                    setModal={setModal}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-xs text-red-500">No Available Blog</p>
        )}
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={blogCurrentPage}
          setCurrentPage={setBlogCurrentPage}
        />
      )}
    </div>
  );
}
