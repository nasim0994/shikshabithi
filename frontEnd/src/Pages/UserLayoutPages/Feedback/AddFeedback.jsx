import { IoMdClose } from "react-icons/io";
import { useAddFeedbackMutation } from "../../../Redux/api/feedbackApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoginWarning from "../../../Components/LoginWarning/LoginWarning";

export default function AddFeedback({ addModal, setAddModal }) {
  const { loggedUser } = useSelector((store) => store.user);

  const [addFeedback, { isLoading }] = useAddFeedbackMutation();
  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const message = form.message.value;
    const category = form.category.value;

    const info = {
      user: loggedUser?.data?._id,
      subject,
      message,
      category,
    };

    let res = await addFeedback(info);
    if (res?.data?.success) {
      toast.success("feedback add success");
      setAddModal(false);
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <div className={`overlay ${addModal && "overlay_show"}`}>
      <div
        className={`modal w-[95%] sm:w-[500px] px-4 py-8 ${
          addModal && "modal_show"
        }`}
      >
        {loggedUser?.success ? (
          <>
            <div className="flex justify-end">
              <button onClick={() => setAddModal(false)}>
                <IoMdClose className="text-neutral-content hover:text-neutral duration-100" />
              </button>
            </div>

            <div className="text-center">
              <h3 className="text-neutral font-medium text-lg">Add Feedback</h3>
              <p className="text-sm text-neutral-content">
                Fill up the form and submit
              </p>
            </div>

            <form
              onSubmit={handleAdd}
              className="mt-4 flex flex-col gap-3 text-sm"
            >
              <div>
                <p className="mb-1">Subject</p>
                <input type="text" name="subject" />
              </div>

              <div>
                <p className="mb-1">Message</p>
                <textarea name="message" rows={5}></textarea>
              </div>

              <div>
                <p className="mb-1">category</p>
                <select name="category">
                  <option value="Appreciation">Appreciation</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Error Reporting">Error Reporting</option>
                  <option value="Feature add or update">
                    Feature add or update
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                <div
                  onClick={() => setAddModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
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
          </>
        ) : (
          <LoginWarning setModal={setAddModal} />
        )}
      </div>
    </div>
  );
}
