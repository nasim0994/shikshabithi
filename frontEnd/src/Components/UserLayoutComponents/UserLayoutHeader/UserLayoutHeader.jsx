import { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import SearchBox from "../../SearchBox/SearchBox";
import { useGetLogoQuery } from "../../../Redux/api/logoApi";

export default function UserLayoutHeader({ setUserSidebar }) {
  const { loggedUser } = useSelector((store) => store.user);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const { data, isLoading } = useGetLogoQuery();

  return (
    <header className="sticky top-0 z-40 py-3 px-6 bg-base-100 text-neutral shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUserSidebar(true)}
            className="user_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>

          <Link to="/" className="md:hidden">
            {isLoading ? (
              "Smart Sikon"
            ) : (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
                  data?.data?.logo
                }`}
                alt="logo"
                className="w-32 sm:w-44"
              />
            )}
          </Link>

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
                <NavLink to="/current-affairs">Current Affairs</NavLink>
              </li>

              <li>
                <NavLink to="/blogs/academy">Blogs</NavLink>
              </li>

              <li>
                <NavLink to="/packages">Packages</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="relative flex items-center gap-4">
          <SearchBox />

          {loggedUser?.success ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="block profile_btn"
              >
                <img
                  src={
                    loggedUser?.data?.profile?.image
                      ? `${import.meta.env.VITE_BACKEND_URL}/user/image/${
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
