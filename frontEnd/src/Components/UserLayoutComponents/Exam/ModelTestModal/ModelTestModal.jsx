import { BsInfoCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginWarning from "../../../LoginWarning/LoginWarning";

export default function ModelTestModal({
  model,
  modelModal,
  setModelModal,
  category,
}) {
  const { loggedUser } = useSelector((store) => store.user);

  return (
    <>
      <div className={`overlay  ${modelModal && "overlay_show"}`}></div>
      <div
        className={`modal w-[90%] sm:w-[380px] p-6 rounded ${
          modelModal && "modal_show"
        }`}
      >
        {loggedUser?.success ? (
          <div className="flex flex-col justify-center items-center text-center gap-4">
            <BsInfoCircle className="text-yellow-400 text-6xl" />
            <h2 className="text-neutral/90">
              প্রত্যেক প্রশ্নের মান সমান এবং <br /> প্রতিটি ভুল উত্তরের জন্য{" "}
              {model?.negativeMark} নম্বর কাটা হবে
            </h2>

            <div className="flex gap-4">
              <Link
                to={`/${category}/model-test/attend/${model?._id}`}
                className="bg-primary text-base-100 px-4 py-1.5 rounded hover:bg-primary/95 duration-150"
              >
                Start Now
              </Link>
              <button
                onClick={() => setModelModal(false)}
                className="bg-gray-200 text-neutral px-4 py-1.5 rounded hover:bg-gray-100 duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <LoginWarning setModal={setModelModal} />
        )}
      </div>
    </>
  );
}
