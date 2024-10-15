import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import JoditEditor from "jodit-react";

import { useSelector } from "react-redux";
import LoginWarning from "../../../Components/LoginWarning/LoginWarning";
import { useAddAskAnsMutation } from "../../../Redux/api/askAnsApi";
import { toast } from "react-toastify";

export default function AddAnsModal({ question, modal, setModal }) {
  const editor = useRef(null);
  const { loggedUser } = useSelector((store) => store.user);
  const [details, setDetails] = useState("");

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    },
  };

  const [addAskAns, { isLoading }] = useAddAskAnsMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const info = {
      ans: details,
      user: loggedUser?.data?._id,
      question,
    };

    let res = await addAskAns(info);

    if (res?.data?.success) {
      toast.success("ans add success");
      setModal(false);
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <>
      <div className={`overlay ${modal && "overlay_show"}`}></div>
      <div className={`modal w-[600px] p-4 ${modal && "modal_show"}`}>
        <div className="flex justify-end">
          <button onClick={() => setModal(false)}>
            <MdClose className="text-neutral-content hover:text-neutral" />
          </button>
        </div>

        <div className="text-center">
          <h3 className="text-neutral text-lg">Add Answer</h3>
          <p className="text-neutral-content text-xs">
            Fill up the form and submit
          </p>
        </div>

        {loggedUser?.success ? (
          <form onSubmit={handleAdd} className="py-4 text-neutral">
            <div>
              <p className="text-xs font-semibold mb-1">
                Answer <sup className="text-red-500">*</sup>
              </p>
              <JoditEditor
                ref={editor}
                value={details}
                onBlur={(text) => setDetails(text)}
                config={config}
              />
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
