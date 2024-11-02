import { useParams } from "react-router-dom";
import BackBtn from "../../../../Components/BackBtn/BackBtn";
import moment from "moment";
import parser from "html-react-parser";
import {
  useGetHandNoteQuery,
  useToggleHandNoteStatusMutation,
} from "../../../../Redux/api/handnotesApi";
import { toast } from "react-toastify";

export default function ViewHandNote() {
  const { id } = useParams();
  const { data } = useGetHandNoteQuery(id);
  const handNote = data?.data;

  const [toggleHandNote] = useToggleHandNoteStatusMutation();

  let createdAt = handNote?.createdAt;
  const timeAgoCreatedAt = moment(createdAt).fromNow();
  let handleActive = async (id) => {
    let isConfirm = window.confirm("are you sure change the status?");
    if (isConfirm) {
      let res = await toggleHandNote({ id });
      if (res?.data?.success) {
        toast.success("Status change success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  const details = handNote?.description && parser(handNote?.description);

  return (
    <section className="py-5">
      <div className="container">
        <div className="items-start">
          <div className="">
            <div className="bg-base-100 shadow rounded p-3">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleActive(handNote?._id)}
                  className={`text-xs ${
                    handNote?.status == "active" ? "third_btn" : "primary_btn"
                  } `}
                >
                  {handNote?.status}
                </button>
                <BackBtn />
              </div>
            </div>

            <div className="mt-2 bg-base-100 shadow rounded ">
              <div className="p-3 border-b flex justify-between items-center">
                <p className="mt-1 text-xs text-neutral-content">
                  Created: {timeAgoCreatedAt}
                </p>

                <h2 className="text-xs">{handNote?.subject?.name}</h2>
              </div>
              <div className="p-3">
                <h2 className="font-medium">{handNote?.title}</h2>

                <div className="mt-2 text-sm md:flex gap-2">
                  {handNote?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={`${
                        import.meta.env.VITE_BACKEND_URL
                      }/handnotes/${image}`}
                      alt="image"
                      className="w-full  h-44 sm:h-96 rounded-t mt-2"
                    />
                  ))}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <img
                    src={
                      handNote?.user?.profile?.image
                        ? `${import.meta.env.VITE_BACKEND_URL}/user/image/${
                            handNote?.user?.profile?.image
                          }`
                        : `/images/demo_user.png`
                    }
                    alt=""
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="text-neutral-content text-xs">Post by</p>
                    <h2 className="text-neutral">
                      {handNote?.user?.profile?.name}
                    </h2>
                  </div>
                </div>

                <div className="mt-3 text-sm">
                  <div className="text-sm">{details}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
