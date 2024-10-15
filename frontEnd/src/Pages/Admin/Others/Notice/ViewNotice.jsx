import { useParams } from "react-router-dom";
import BackBtn from "../../../../Components/BackBtn/BackBtn";
import moment from "moment";
import parser from "html-react-parser";
import {
  useGetNoticeQuery,
  useToggleNoticeStatusMutation,
} from "../../../../Redux/api/noticeApi";
import { toast } from "react-toastify";

export default function ViewNotice() {
  const { id } = useParams();
  const { data } = useGetNoticeQuery(id);
  const notice = data?.data;

  const [toggleNotice] = useToggleNoticeStatusMutation();

  let createdAt = notice?.createdAt;
  const timeAgoCreatedAt = moment(createdAt).fromNow();
  let handleActive = async (id) => {
    let isConfirm = window.confirm("are you sure change the status?");
    if (isConfirm) {
      let res = await toggleNotice({ id });
      if (res?.data?.success) {
        toast.success("Status change success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  const details = notice?.description && parser(notice?.description);

  return (
    <section className="py-5">
      <div className="container">
        <div className="items-start">
          <div className="">
            <div className="bg-base-100 shadow rounded p-3">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleActive(notice?._id)}
                  className={`text-xs ${
                    notice?.status == "active" ? "third_btn" : "primary_btn"
                  } `}
                >
                  {notice?.status}
                </button>
                <BackBtn />
              </div>
            </div>

            <div className="mt-2 bg-base-100 shadow rounded ">
              <div className="p-3 border-b flex justify-between items-center">
                <p className="mt-1 text-xs text-neutral-content">
                  Created: {timeAgoCreatedAt}
                </p>

                <h2 className="text-xs">{notice?.subject?.name}</h2>
              </div>
              <div className="p-3">
                <h2 className="font-medium">{notice?.title}</h2>

                {notice?.image && (
                  <div className="mt-2 text-sm">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/notice/${
                        notice?.image
                      }`}
                      alt=""
                      className="w-full h-full rounded-t mt-2"
                    />
                  </div>
                )}

                <div className="mt-2 flex items-center gap-2">
                  <img
                    src={
                      notice?.user?.profile?.image
                        ? `${import.meta.env.VITE_API_URL}/user/image/${
                            notice?.user?.profile?.image
                          }`
                        : `/images/demo_user.png`
                    }
                    alt=""
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="text-neutral-content text-xs">Post by</p>
                    <h2 className="text-neutral">
                      {notice?.user?.profile?.name}
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
