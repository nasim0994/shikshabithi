import { FaBookReader } from "react-icons/fa";
import { HiBuildingLibrary } from "react-icons/hi2";
import { PiBagFill } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdOutlineClearAll } from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useGetAcademySubjectsQuery } from "../../Redux/api/academy/subjectApi";

const categories = [
  {
    _id: 1,
    name: "Academy",
    icon: <HiBuildingLibrary />,
    url: "/blogs/academy",
  },
  {
    _id: 2,
    name: "Admission",
    icon: <FaBookReader className="text-xs" />,
    url: "/blogs/admission",
  },
  {
    _id: 3,
    name: "Job",
    icon: <PiBagFill className="text-sm" />,
    url: "/blogs/job",
  },
  {
    _id: 4,
    name: "Others",
    icon: <MdOutlineClearAll className="text-sm" />,
    url: "/blogs/others",
  },
];

export default function BlogHeader() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const searchSubject = queryParams.get("subject");

  let query = {};
  if (pathname == "/blogs/admission") query["classuuid"] = 200;
  const { data: subject } = useGetAcademySubjectsQuery({ ...query });
  const subjects = subject?.data;

  return (
    <div className="bg-base-100 p-4 rounded shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-primary font-semibold text-lg">
          Blogs || Smart Sikon
        </h3>
        <Link to="/blog/add" className="text-xs primary_btn">
          Add Blog
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:flex gap-2 mt-2">
        {categories?.map((category) => (
          <NavLink
            to={category?.url}
            key={category?._id}
            className={({ isActive }) =>
              `flex items-center gap-1.5 border rounded-xl px-2.5 py-1.5 duration-300 ${
                isActive ? "bg-primary text-base-100" : ""
              }`
            }
          >
            <span className="opacity-50 -mt-px">{category?.icon}</span>
            <p className="text-[11px] whitespace-nowrap">{category?.name}</p>

            {pathname === category?.url && <IoCheckmarkDoneOutline />}
          </NavLink>
        ))}

        <select
          onChange={(e) => {
            if (e.target.value === "all") {
              navigate(`${pathname}`);
            } else {
              navigate(`${pathname}?subject=${e.target.value}`);
            }
          }}
          className="w-28 text-xs rounded-xl border-gray-200 cursor-pointer"
          value={searchSubject || "all"}
        >
          <option value="all">All Subject</option>
          {subjects?.map((s) => (
            <option key={s?._id} value={s?._id}>
              {s?.name}-({s?.class?.name})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
