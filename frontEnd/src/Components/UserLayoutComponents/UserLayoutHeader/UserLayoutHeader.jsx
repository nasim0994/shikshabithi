import { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

export default function UserLayoutHeader({ setUserSidebar }) {
  const { loggedUser } = useSelector((store) => store.user);
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-3 px-6 bg-base-100 text-neutral shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUserSidebar(true)}
            className="user_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>

          <nav className="hidden md:block header">
            <ul className="flex items-center gap-8 text-sm text-neutral/80">
              <li>
                <NavLink to="/academy">Academy</NavLink>
              </li>

              <li>
                <NavLink to="/admission">Adminssion</NavLink>
              </li>

              <li>
                <NavLink to="/job-assistant">Job Assistant</NavLink>
              </li>

              <li>
                <NavLink to="/blogs">Blogs</NavLink>
              </li>

              <li>
                <NavLink to="/packages">Package</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="relative">
          {loggedUser?.success ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="block profile_btn"
              >
                <img
                  src={
                    loggedUser?.data?.profile?.image
                      ? `${import.meta.env.VITE_API_URL}/user/image/${
                          loggedUser?.data?.profile?.image
                        }`
                      : `/images/demo_user.png`
                  }
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
              </button>

              {profileDropdown && (
                <ProfileDropdown
                  setProfileDropdown={setProfileDropdown}
                  loggedUser={loggedUser}
                />
              )}
            </div>
          ) : (
            <Link to="/login" className="login_btn text-sm">
              <MdOutlineLogin />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
