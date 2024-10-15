import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { useSelector } from "react-redux";
import {
  useDeleteBlogCommentMutation,
  useGetBlogsCommentsQuery,
  useUpdateBlogCommentMutation,
} from "../../Redux/api/blogsCommentApi";

export default function Comments({ selectedBlog }) {
  const { loggedUser } = useSelector((store) => store.user);
  const [editCommentToggle, setEditCommentToggle] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const [updateComment] = useUpdateBlogCommentMutation();
  const [deleteComment] = useDeleteBlogCommentMutation();

  const handleDeleteComment = async (id) => {
    try {
      const isConfirm = window.confirm("are you sure delete this Comment?");
      if (isConfirm) {
        await deleteComment(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditToggle = (i) => {
    if (editCommentToggle != i) {
      setEditCommentToggle(i);
    } else {
      setEditCommentToggle(null);
    }
  };

  const handleUpdateComment = async (id) => {
    if (editedComment) {
      const data = {
        comment: editedComment,
      };

      let res = await updateComment({ id, data });
      if (res?.data?.success) {
        setEditCommentToggle(null);
      }
    } else {
      setEditCommentToggle(null);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  let limit = 5;
  let querys = {};
  querys["blog"] = selectedBlog;
  querys["limit"] = limit;
  querys["page"] = currentPage;
  const { data: commentData, isLoading: isCommentsLoading } =
    useGetBlogsCommentsQuery({
      ...querys,
    });
  const allComment = commentData?.data;

  return (
    <div>
      {isCommentsLoading ? (
        "Loading..."
      ) : allComment?.length > 0 ? (
        allComment?.map((comment, i) => (
          <div key={comment?._id} className="flex items-center gap-2 mt-2">
            <img
              className="w-10 max-h-10"
              src={
                comment?.user?.profile?.image
                  ? `${import.meta.env.VITE_API_URL}/user/image/${
                      comment?.user?.profile?.image
                    }`
                  : `/images/demo_user.png`
              }
              alt=""
            />
            <div className="w-full">
              <h3 className="font-semibold ">{comment?.user?.profile?.name}</h3>
              {editCommentToggle == i ? (
                <textarea
                  onChange={(e) => setEditedComment(e.target.value)}
                  type="text"
                  className="mt-1 h-10"
                  defaultValue={comment?.comment}
                />
              ) : (
                <h4 className="font-normal mt-1 text-sm">{comment?.comment}</h4>
              )}
            </div>
            {loggedUser?.data?.profile?._id == comment?.user?.profile?._id && (
              <div className="flex items-center gap-1.5 justify-end text-lg text-primary">
                {editCommentToggle == i ? (
                  <>
                    <ImCancelCircle
                      className="cursor-pointer"
                      onClick={() => setEditCommentToggle(null)}
                    />
                    <FaCheckCircle
                      className="cursor-pointer"
                      onClick={() => handleUpdateComment(comment?._id)}
                    />
                  </>
                ) : (
                  <>
                    <FaEdit
                      className="cursor-pointer"
                      onClick={() => handleEditToggle(i)}
                    />
                    <MdDelete
                      onClick={() => handleDeleteComment(comment?._id)}
                      className="cursor-pointer"
                    />
                  </>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-[13px] text-red-500">No comment found.</p>
      )}
      <Pagination
        pages={commentData?.meta?.pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
