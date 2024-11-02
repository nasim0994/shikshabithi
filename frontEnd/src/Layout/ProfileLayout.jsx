import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import ProfileImage from "../Components/UserLayoutComponents/Profile/ProfileImage/ProfileImage";
import ProfileBanner from "../Components/UserLayoutComponents/Profile/ProfileBanner/ProfileBanner";

export default function ProfileLayout() {
  const { loggedUser } = useSelector((store) => store.user);
  const { pathname } = useLocation();

  let menus = [
    { _id: 1, name: "Overview", link: "/profile" },
    { _id: 4, name: "Subscription", link: "/profile/subscription" },
    { _id: 5, name: "Setting", link: "/profile/setting" },
  ];

  return (
    <div>
      {/* banner */}
      <ProfileBanner loggedUser={loggedUser} />

      <div className="px-4 bg-base-100">
        <div className="flex items-center gap-4">
          <ProfileImage loggedUser={loggedUser} />

          <div>
            <div className="flex gap-3 items-center">
              <h3 className="text-neutral sm:text-lg">
                {loggedUser?.data?.profile?.name}
              </h3>
              <span className="text-[10px] px-1.5 py-[2px] font-medium bg-green-100 text-green-600 rounded-lg">
                verify
              </span>
            </div>

            <div className="mt-1 text-xs text-neutral/90">
              <div className="flex items-center gap-1 uppercase">
                <FaUser /> {loggedUser?.data?.role}
              </div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="profile_menu flex overflow-x-auto gap-2 mt-2 horizontal_scroll">
          {menus?.map((manu) => (
            <Link
              to={manu?.link}
              key={manu?._id}
              className={`flex items-center gap-2 border rounded-xl px-2.5 py-1.5 hover:border-primary hover:text-primary duration-300 ${
                pathname === manu?.link && "bg-primary text-base-100"
              }`}
            >
              <p className="text-[11px] whitespace-nowrap">{manu?.name}</p>

              {pathname === manu?.link && <IoCheckmarkDoneOutline />}
            </Link>
          ))}
        </div>
      </div>

      <div className="py-2">
        <Outlet />
      </div>
    </div>
  );
}
