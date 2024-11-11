import { NavLink } from "react-router-dom";
import { FaRegCircleQuestion } from "react-icons/fa6";
// import { TiStarburst } from "react-icons/ti";
import { PiExam } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import { MdNoteAlt } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaQuestion, FaRegStar } from "react-icons/fa";
import { TbPackages } from "react-icons/tb";

export default function UserSidebarLists() {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/discussions">
            <FaRegCircleQuestion />
            Ask Question?
          </NavLink>
        </li>
      </ul>

      <ul className="mt-5">
        <h2 className="text-neutral/80 mb-2">Exam</h2>
        <li>
          <NavLink to="/exam-list">
            <PiExam />
            Exam List
          </NavLink>
        </li>

        <li>
          <NavLink to="/exam/result/modeltest">
            <PiExam />
            Exam Result
          </NavLink>
        </li>
      </ul>

      <ul className="mt-5">
        <h2 className="text-neutral/80 mb-2">Categories</h2>
        <li>
          <NavLink to="/academy">
            <BiCategory />
            Academy
          </NavLink>
        </li>

        <li>
          <NavLink to="/admission">
            <BiCategory />
            Admission
          </NavLink>
        </li>
        <li>
          <NavLink to="/job-assistant">
            <BiCategory />
            Job Assistant
          </NavLink>
        </li>

        <li>
          <NavLink to="/current-affairs">
            <BiCategory />
            Current Affairs
          </NavLink>
        </li>

        <li>
          <NavLink to="/blogs/academy">
            <BiCategory />
            Blog Content
          </NavLink>
        </li>
      </ul>

      <ul className="mt-5">
        <h2 className="text-neutral/80 mb-2">GENERAL</h2>

        <li>
          <NavLink to="/handnotes">
            <MdNoteAlt />
            Hand Note
          </NavLink>
        </li>

        <li>
          <NavLink to="/notices">
            <IoNotifications />
            Notice
          </NavLink>
        </li>
      </ul>

      <ul className="mt-5">
        <h2 className="text-neutral/80 mb-2">Others</h2>
        <li>
          <NavLink to="/faqs">
            <FaQuestion />
            FAQ
          </NavLink>
        </li>

        <li>
          <NavLink to="/packages">
            <TbPackages />
            Package
          </NavLink>
        </li>

        {/* <li>
          <NavLink to="/">
            <TiStarburst />
            Point
          </NavLink>
        </li> */}

        <li>
          <NavLink to="/feedback">
            <FaRegStar />
            Feedback
          </NavLink>
        </li>
      </ul>
    </>
  );
}
