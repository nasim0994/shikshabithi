import { useState } from "react";
import AddFeedback from "./AddFeedback";
import { useGetFeedbackQuery } from "../../../Redux/api/feedbackApi";
import FeedbackSkeleton from "../../../Components/Skeleton/FeedbackSkeleton";

export default function Feedbacks() {
  const [addModal, setAddModal] = useState(false);
  const { data, isLoading } = useGetFeedbackQuery();
  const feedbacks = data?.data;

  console.log(feedbacks);

  if (isLoading) return <FeedbackSkeleton />;

  return (
    <div>
      <div className="bg-primary/20 p-4 rounded flex justify-between items-center">
        <h3>Feedbacks</h3>
        <div>
          <button
            onClick={() => setAddModal(true)}
            className="bg-base-100 text-xs px-3 py-2 rounded"
          >
            + Add Feedback
          </button>

          <AddFeedback addModal={addModal} setAddModal={setAddModal} />
        </div>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        {feedbacks?.map((feedback) => (
          <div
            key={feedback?._id}
            className="bg-base-100 shadow p-4 rounded-lg sm:flex items-center gap-4"
          >
            <div className="flex flex-col items-center mb-3 sm:mb-0">
              <img
                src={
                  feedback?.user?.profile?.image
                    ? `${import.meta.env.VITE_API_URL}/user/image/${
                        feedback?.user?.profile?.image
                      }`
                    : `/images/demo_user.png`
                }
                alt=""
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-primary"
              />
              <p className="text-center text-sm mt-2">
                {feedback?.user?.profile?.name}
              </p>
            </div>

            <div>
              <h3>{feedback?.subject}</h3>
              <p className="text-xs opacity-90">{feedback?.category}</p>
              <p className="text-[13px] mt-2 opacity-80">{feedback?.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
