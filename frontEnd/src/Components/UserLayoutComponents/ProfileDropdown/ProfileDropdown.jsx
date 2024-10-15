import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../Redux/api/user/userSlice";
import { useEffect } from "react";

export default function ProfileDropdown({ loggedUser, setProfileDropdown }) {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        (!e.target.closest(".profile_btn") &&
          !e.target.closest(".profileDropdown")) ||
        e.target.closest(".profileDropdown ul li a")
      ) {
        setProfileDropdown(false);
      }
    });
  }, [setProfileDropdown]);

  return (
    <div className="absolute top-8 right-0 bg-base-100 shadow rounded min-w-52 text-sm text-neutralduration-200 profileDropdown">
      <div className="p-2">
        <h2>{loggedUser?.data?.profile?.name}</h2>
        <p className="text-[13px] text-neutral/80">{loggedUser?.data?.email}</p>
      </div>

      <ul className="p-2 border-t text-neutral/90">
        <li>
          <Link
            to="/profile"
            className="block py-[3px] hover:text-primary duration-150"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/profile/subscription"
            className="block py-[3px] hover:text-primary duration-150"
          >
            Subscription
          </Link>
        </li>
        <li>
          <Link
            to="/profile/setting"
            className="block py-[3px] hover:text-primary duration-150"
          >
            Setting
          </Link>
        </li>
      </ul>

      <div className="border-t p-2 text-neutral/90">
        <button
          onClick={() => dispatch(userLogout())}
          className="flex items-center gap-1 hover:text-red-500 duration-150"
        >
          <MdLogout /> Singout
        </button>
      </div>
    </div>
  );
}
