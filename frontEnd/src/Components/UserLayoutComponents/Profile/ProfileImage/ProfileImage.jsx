import { useState } from "react";
import { MdEdit } from "react-icons/md";
import UploadModal from "./UploadModal";

export default function ProfileImage({ loggedUser }) {
  const [modal, setModal] = useState(false);

  return (
    <div className="relative -mt-10 sm:-mt-16">
      <img
        src={
          loggedUser?.data?.profile?.image
            ? `${import.meta.env.VITE_BACKEND_URL}/user/image/${
                loggedUser?.data?.profile?.image
              }`
            : `/images/demo_user.png`
        }
        alt=""
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-primary"
      />

      <button
        onClick={() => setModal(true)}
        className="absolute top-3 right-1 w-6 h-6 rounded-full bg-base-100 text-neutral flex justify-center items-center hover:bg-gray-50 duration-200"
      >
        <MdEdit className="text-primary text-sm" />
      </button>

      <UploadModal modal={modal} setModal={setModal} />
    </div>
  );
}
