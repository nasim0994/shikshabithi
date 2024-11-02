import { useState } from "react";
import { MdEdit } from "react-icons/md";
import UploadModal from "./UploadModal";

export default function ProfileBanner({ loggedUser }) {
  const [modal, setModal] = useState(false);

  return (
    <div className="relative">
      <img
        src={
          loggedUser?.data?.profile?.banner
            ? `${import.meta.env.VITE_BACKEND_URL}/user/banner/${
                loggedUser?.data?.profile?.banner
              }`
            : `/images/demo-banner.jpg`
        }
        alt=""
        className="w-full h-[20vh] sm:h-[30vh] rounded-t"
      />

      <button
        onClick={() => setModal(true)}
        className="absolute top-0 right-0 w-6 h-6 rounded-full bg-base-100 text-neutral flex justify-center items-center hover:bg-gray-50 duration-200"
      >
        <MdEdit className="text-primary text-sm" />
      </button>

      <UploadModal modal={modal} setModal={setModal} />
    </div>
  );
}
