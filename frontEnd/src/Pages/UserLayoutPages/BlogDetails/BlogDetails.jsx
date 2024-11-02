import { Link, useParams } from "react-router-dom";
import BackBtn from "../../../Components/BackBtn/BackBtn";
import moment from "moment";
import parser from "html-react-parser";
import {
  useGetBlogQuery,
  useAddBlogViewMutation,
} from "../../../Redux/api/blogsApi";
import { useAddBlogCommentMutation } from "../../../Redux/api/blogsCommentApi";
import RelatedBlogs from "../Blogs/RelatedBlogs";
import { useEffect, useRef, useState } from "react";

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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spin from "../../../Components/Loader/Spin";
import Spinner from "../../../Components/Loader/Spinner/Spinner";
import Comments from "../../../Components/Comments/Comments";

export default function BlogDetails() {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { loggedUser } = useSelector((store) => store.user);
  const { data, isLoading } = useGetBlogQuery(id);
  const [addBlogView] = useAddBlogViewMutation();
  const blog = data?.data;

  const [addComment, { isLoading: isCommentLoading }] =
    useAddBlogCommentMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    let comment = e.target.comment.value;

    const info = {
      comment: comment,
      user: loggedUser?.data?._id,
      blog: id,
    };

    if (comment?.length > 0) {
      let res = await addComment(info);
      if (res?.data?.success) {
        toast.success("Comment add success");
        e.target.comment.value = "";
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    } else {
      toast.warning("Write a Comment");
    }
  };

  const [shareDropdown, setShareDropdown] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".sharebtn")) {
        setShareDropdown(null);
      }
    });
  }, [shareDropdown]);

  const hasExecutedRef = useRef(false);

  useEffect(() => {
    const blogView = async () => {
      try {
        let blogId = id;
        await addBlogView({ blogId });
      } catch (error) {
        console.error("Error adding blog view:", error);
      }
    };

    if (!hasExecutedRef.current) {
      blogView();
      hasExecutedRef.current = true;
    }
  }, [id, addBlogView]);

  let createdAt = blog?.createdAt;
  const timeAgoCreatedAt = moment(createdAt).fromNow();

  const details = blog?.details && parser(blog?.details);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-4 items-start">
          <div className="md:col-span-2">
            <div className="bg-base-100 shadow rounded p-3">
              <div className="flex justify-between items-center">
                <Link to="/blog/add" className="text-xs primary_btn">
                  Create blog
                </Link>
                <BackBtn />
              </div>
            </div>

            <div className="mt-2 bg-base-100 shadow rounded ">
              <div className="p-3 border-b flex justify-between items-center">
                <p className="mt-1 text-xs text-neutral-content">
                  Created: {timeAgoCreatedAt}
                </p>
              </div>

              <div>
                <div className="p-3">
                  <h2 className="font-semibold text-3xl">{blog?.title}</h2>

                  {blog?.image && (
                    <div className="mt-2 text-sm">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/blogs/${
                          blog?.image
                        }`}
                        alt=""
                        className="w-full max-h-64 min-h-48 sm:min-h-80 sm:max-h-[430px] rounded-t mt-2"
                      />
                    </div>
                  )}

                  <div className="mt-2 flex justify-between items-center gap-2">
                    <div>
                      <img
                        src={
                          blog?.user?.profile?.image
                            ? `${import.meta.env.VITE_BACKEND_URL}/user/image/${
                                blog?.user?.profile?.image
                              }`
                            : `/images/demo_user.png`
                        }
                        alt=""
                        className="w-9 h-9 rounded-full"
                      />

                      <div>
                        <p className="text-neutral-content text-xs">Post by</p>
                        <h3 className="text-neutral font-medium text-sm">
                          {blog?.user?.profile?.name}
                        </h3>
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
                                url={`${
                                  import.meta.env.VITE_FRONTEND_URL
                                }/blog/${blog?._id}`}
                              >
                                <FaFacebook className="text-xl text-blue-600" />
                              </FacebookShareButton>
                              <TwitterShareButton
                                url={`${
                                  import.meta.env.VITE_FRONTEND_URL
                                }/blog/${blog?._id}`}
                              >
                                <FaSquareXTwitter className="text-xl" />
                              </TwitterShareButton>
                              <TelegramShareButton
                                url={`${
                                  import.meta.env.VITE_FRONTEND_URL
                                }/blog/${blog?._id}`}
                              >
                                <FaTelegram className="text-xl text-sky-500" />
                              </TelegramShareButton>
                              <LinkedinShareButton
                                url={`${
                                  import.meta.env.VITE_FRONTEND_URL
                                }/blog/${blog?._id}`}
                              >
                                <FaLinkedin className="text-xl text-sky-400" />
                              </LinkedinShareButton>
                              <WhatsappShareButton
                                url={`${
                                  import.meta.env.VITE_FRONTEND_URL
                                }/blog/${blog?._id}`}
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
                    <div className="text-sm">{details}</div>
                  </div>
                </div>

                <div className="p-3">
                  <form
                    onSubmit={handleAdd}
                    className="md:flex items-start gap-2"
                  >
                    <textarea
                      name="comment"
                      className="w-full border border-primary p-2 h-14"
                      placeholder="Write a Comment"
                    />
                    <button className="py-2 px-3 bg-primary text-white font-semibold rounded">
                      {isCommentLoading ? (
                        <Spin type="spin" color="#fff" />
                      ) : (
                        "Comment"
                      )}
                    </button>
                  </form>
                  <Comments selectedBlog={blog?._id} />
                </div>
              </div>
            </div>
          </div>

          <div className="-mt-3">
            <RelatedBlogs
              activeCategory={
                blog?.category == "academy"
                  ? 1
                  : blog?.category == "admission"
                  ? 2
                  : blog?.category == "job"
                  ? 3
                  : 4
              }
              selectedSubject={blog?.subject?._id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
