import { MdClose } from "react-icons/md";

import { useSelector } from "react-redux";
import LoginWarning from "../../../Components/LoginWarning/LoginWarning";
import { useAddBlogCommentMutation } from "../../../Redux/api/blogsCommentApi";
import { toast } from "react-toastify";

export default function AddCommentModal({ blog, modal, setModal }) {
  const { loggedUser } = useSelector((store) => store.user);

  const [addComment, { isLoading }] = useAddBlogCommentMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    let comment = e.target.comment.value;

    const info = {
      comment: comment,
      user: loggedUser?.data?._id,
      blog,
    };

    let res = await addComment(info);

    if (res?.data?.success) {
      toast.success("Comment add success");
      setModal(false);
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <>
      <div className={`overlay ${modal && "overlay_show"}`}></div>
      <div className={`modal w-96 sm:w-[600px] p-4 ${modal && "modal_show"}`}>
        <div className="flex justify-end">
          <button onClick={() => setModal(false)}>
            <MdClose className="text-neutral-content hover:text-neutral" />
          </button>
        </div>

        <div className="text-center">
          <h3 className="text-neutral text-lg">Add Comment</h3>
          <p className="text-neutral-content text-xs">
            Fill up the form and submit
          </p>
        </div>

        {loggedUser?.success ? (
          <form onSubmit={handleAdd} className="py-4 text-neutral">
            <div className="px-3">
              <p className="text-xs font-semibold mb-1">
                Comment <sup className="text-red-500">*</sup>
              </p>
              <textarea className="w-full" name="comment" id=""></textarea>
            </div>

            <div className="mt-4 flex gap-3 text-sm justify-center">
              <div
                onClick={() => setModal(false)}
                className="px-4 py-1.5 rounded bg-gray-200 cursor-pointer"
              >
                Cancel
              </div>

              <button
                disabled={isLoading && "disabled"}
                className="primary_btn"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        ) : (
          <LoginWarning setModal={setModal} />
        )}
      </div>
    </>
  );
}
