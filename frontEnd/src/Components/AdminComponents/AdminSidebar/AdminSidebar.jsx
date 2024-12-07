import { RiPagesFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import {
  MdMonitor,
  MdOutlineDashboard,
  MdFeaturedPlayList,
} from "react-icons/md";
import { FaSchool, FaReadme, FaClipboard, FaUsers } from "react-icons/fa";

import { RiPsychotherapyFill } from "react-icons/ri";
import { FaChartLine, FaTags } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbPackages } from "react-icons/tb";
import { IoSchool } from "react-icons/io5";
import { BiSolidReceipt } from "react-icons/bi";
import { RiListCheck3 } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";

import SidebarItems from "./SidebarItems";
import { useGetLogoQuery } from "../../../Redux/api/logoApi";
import { CiCalendarDate } from "react-icons/ci";

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashbaord",
    path: "/admin/dashboard",
  },

  {
    icon: <FaSchool />,
    title: "Academy",
    subMenu: [
      {
        title: "Categories",
        path: "/admin/academy/categories",
      },
      {
        title: "Classes",
        path: "/admin/academy/classes",
      },
      {
        title: "Subjects",
        path: "/admin/academy/subjects",
      },
      {
        title: "Chapter",
        subSubMenu: [
          { title: "Chapters", path: "/admin/academy/chapters" },
          { title: "Sub Chapters", path: "/admin/academy/sub-chapters" },
          {
            title: "Sub Sub Chapters",
            path: "/admin/academy/sub-sub-chapters",
          },
        ],
      },
      {
        title: "Contents",
        path: "/admin/academy/contents",
      },
    ],
  },

  {
    icon: <FaReadme />,
    title: "Admission",
    subMenu: [
      {
        title: "Universities",
        path: "/admin/admission/universities",
      },
      {
        title: "Question Set",
        path: "/admin/admission/question-set",
      },
      {
        title: "Admission MCQ",
        path: "/admin/admission/mcq",
      },
    ],
  },

  {
    icon: <IoSchool />,
    title: "Job Assistant",
    subMenu: [
      {
        title: "Institutes",
        path: "/admin/job/institutes",
      },
      {
        title: "Question Set",
        path: "/admin/job/question-set",
      },
      {
        title: "Job MCQ",
        path: "/admin/job/mcq",
      },
    ],
  },

  {
    icon: <FaClipboard />,
    title: "Model Test",
    subMenu: [
      {
        title: "All Model Test",
        path: "/admin/modeltest/all",
      },
      {
        title: "Add Model Test",
        path: "/admin/modeltest/add",
      },
    ],
  },

  {
    icon: <FaClipboard />,
    title: "Board Exam",
    subMenu: [
      {
        title: "Board",
        path: "/admin/board-exam/board",
      },
      {
        title: "Board MCQ",
        path: "/admin/board-exam/mcq",
      },
      {
        title: "Board Written",
        path: "/admin/board-exam/written",
      },
    ],
  },

  {
    icon: <FaTags />,
    title: "Tags",
    path: "/admin/tags",
  },

  {
    icon: <CiCalendarDate />,
    title: "Years",
    path: "/admin/years",
  },

  {
    icon: <RiListCheck3 />,
    title: "MCQ",
    subMenu: [
      {
        title: "All MCQ",
        path: "/admin/mcq/all",
      },
      {
        title: "Add MCQ",
        path: "/admin/mcq/add",
      },
    ],
  },

  {
    icon: <CgNotes />,
    title: "Written",
    subMenu: [
      {
        title: "All Written",
        path: "/admin/academy/writtens",
      },
      {
        title: "Add Written",
        path: "/admin/academy/written/add",
      },
    ],
  },

  {
    icon: <BiSolidReceipt />,
    title: "Current Affairs",
    path: "/admin/current-affairs",
  },

  {
    icon: <MdFeaturedPlayList />,
    title: "Features",
    subMenu: [
      {
        title: "Feature Image",
        path: "/admin/features/image",
      },
      {
        title: "All Features",
        path: "/admin/features/all",
      },
    ],
  },

  {
    icon: <TbPackages />,
    title: "Pricing",
    subMenu: [
      {
        title: "All Packages",
        path: "/admin/packages",
      },
      {
        title: "Payment Instruction",
        path: "/admin/pricing/payment-instruction",
      },
      {
        title: "Payment History",
        path: "/admin/pricing/payment-history",
      },
    ],
  },

  {
    icon: <FaUsers />,
    title: "Users",
    subMenu: [
      {
        title: "All Users",
        path: "/admin/users",
      },
      {
        title: "All Administators",
        path: "/admin/admins",
      },
    ],
  },

  {
    icon: <MdMonitor />,
    title: "Front-End Setting",
    subMenu: [
      {
        title: "Logo",
        path: "/admin/front-end/logo",
      },
      {
        title: "Banner",
        path: "/admin/front-end/banner",
      },
      {
        title: "Founder Speech",
        path: "/admin/front-end/founder-speech",
      },
      {
        title: "Admin Notice",
        path: "/admin/front-end/admin-notice/all",
      },
    ],
  },

  {
    icon: <RiPagesFill />,
    title: "Pages",
    subMenu: [
      {
        title: "About",
        path: "/admin/page/about",
      },
      {
        title: "Contact",
        path: "/admin/page/contact",
      },
      {
        title: "FAQ",
        path: "/admin/page/faq",
      },
      {
        title: "Privacy Policy",
        path: "/admin/page/privacy-policy",
      },
    ],
  },

  {
    icon: <IoMdSettings />,
    title: "General Setting",
    subMenu: [
      {
        title: "profile",
        path: "/admin/general-setting/profile",
      },
    ],
  },

  {
    icon: <RiPsychotherapyFill />,
    title: "Others",
    subMenu: [
      {
        title: "Blogs",
        path: "/admin/others/blog-all",
      },
      {
        title: "Ask Quetions",
        path: "/admin/others/question-all",
      },
      {
        title: "Hand Note",
        path: "/admin/others/handnote-all",
      },
      {
        title: "Notice",
        path: "/admin/others/notice-all",
      },
    ],
  },

  {
    icon: <FaChartLine />,
    title: "SEO Setting",
    path: "/admin/seo",
  },
];

export default function AdminSidebar() {
  const { data, isLoading } = useGetLogoQuery();

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <nav className="admin_siderbar">
          <Link to="/admin/dashboard" className="py-3 block">
            {isLoading ? (
              "Smart Sikon"
            ) : (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
                  data?.data?.logo
                }`}
                alt="logo"
                className="w-3/5 mx-auto"
              />
            )}
          </Link>

          <ul>
            {adminSidebarItems?.map((item, i) => (
              <SidebarItems key={i} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
