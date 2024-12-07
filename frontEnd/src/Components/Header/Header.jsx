import { BiSearch } from "react-icons/bi";
import "/src/assets/css/Header.css";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineLogin, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { useGetLogoQuery } from "../../Redux/api/logoApi";
import { useSelector } from "react-redux";
import ProfileDropdown from "../UserLayoutComponents/ProfileDropdown/ProfileDropdown";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [moreropdown, setMoreDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);

  const { loggedUser } = useSelector((store) => store.user);

  const { data, isLoading } = useGetLogoQuery();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        e.target.closest(".menu_wrap ul li a") &&
        !e.target.closest(".menu_wrap ul li a svg")
      ) {
        setMobileMenu(false);
      }

      if (!e.target.closest(".more_btn")) {
        setMoreDropdown(false);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".searchBtn") && !e.target.closest(".searchBox")) {
        setSearchDropdown(false);
      }
    });
  }, []);

  return (
    <header className={`py-2 xl:py-0 sticky top-0 z-[50] bg-base-100`}>
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/">
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

          <div className="flex items-center gap-2">
            <nav className="menu_wrap flex items-center gap-2">
              <button
                onClick={() => setMobileMenu(false)}
                className={`overlay 2xl:hidden ${mobileMenu && "overlay_show"}`}
              ></button>

              <ul className={`${mobileMenu && "show"}`}>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/academy">SCHOOL</NavLink>
                </li>
                <li>
                  <NavLink to="/admission">ADMISSION</NavLink>
                </li>
                <li>
                  <NavLink to="/job-assistant">JOB SOLUTION</NavLink>
                </li>
                <li>
                  <NavLink to="/packages">Packages</NavLink>
                </li>
                <li>
                  <Link to="/exam-list" className="py-0">
                    Exam
                  </Link>
                </li>
                <li>
                  <NavLink to="/blogs/academy" className="py-0">
                    Blogs
                  </NavLink>
                </li>
                <li className="relative">
                  <button
                    onClick={() => setMoreDropdown(!moreropdown)}
                    className="more_btn"
                  >
                    More <MdOutlineKeyboardArrowDown className="text-lg" />
                  </button>

                  {moreropdown && (
                    <ol className="lg:absolute right-0 top-14 bg-base-100 shadow min-w-60 rounded p-1">
                      <li>
                        <Link to="/current-affairs" className="py-0">
                          Current Affairs
                        </Link>
                      </li>
                      <li>
                        <Link to="/discussions" className="py-0">
                          Ask Question
                        </Link>
                      </li>
                      <li>
                        <Link to="/handnotes" className="py-0">
                          Hand Notes
                        </Link>
                      </li>
                      <li>
                        <Link to="/notices" className="py-0">
                          Notices
                        </Link>
                      </li>
                      <li>
                        <Link to="/faqs" className="py-0">
                          FAQ
                        </Link>
                      </li>
                      <li>
                        <Link to="/feedback" className="py-0">
                          Feedback
                        </Link>
                      </li>
                    </ol>
                  )}
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button onClick={() => setSearchDropdown(!searchDropdown)}>
                  <BiSearch className="searchBtn text-[22px] text-neutral/80 mt-2" />
                </button>

                <div
                  className={`searchBox absolute top-10 right-0 bg-base-100 rounded p-3 shadow ${
                    searchDropdown ? "block" : "hidden"
                  }`}
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="প্রশ্ন সার্চ করুন..."
                      className="w-[95%] sm:w-80 placeholder:text-sm pl-7 px-3 border-primary/50 text-[15px]"
                    />

                    <BiSearch className="text-neutral/80 mt-2 absolute top-[2.5px] left-2" />
                  </div>
                </div>
              </div>

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

              <button onClick={() => setMobileMenu(true)} className="lg:hidden">
                <AiOutlineMenu className={`text-2xl`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
