import { AiOutlineClose } from "react-icons/ai";
import { useGetActiveAdminNoticeQuery } from "../../Redux/api/adminNoticeApi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminNotice() {
  const [isOpen, setIsOpen] = useState(true);

  const { data, isLoading } = useGetActiveAdminNoticeQuery();
  const notice = data?.data;

  if (isOpen && !isLoading) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-screen bg-black/60 z-40"></div>
        <div className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[220px] bg-base-100 shadow rounded p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4"
          >
            <AiOutlineClose className="text-neutral-content hover:text-neutral duration-300" />
          </button>

          <div className="text-center mt-8">
            <h3 className="text-2xl font-medium text-primary">
              {notice?.title}
            </h3>
            <p className="mt-4 text-sm text-neutral-content">
              {notice?.description}
            </p>

            <div className="mt-4">
              <Link to={notice?.link} className="primary_btn text-[13px]">
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
