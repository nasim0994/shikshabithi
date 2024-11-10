import { Link, NavLink, useLocation } from "react-router-dom";
import { FaAward } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const tests = [
  {
    _id: 1,
    name: "On Demand Test",
    icon: <FaAward />,
    path: "/exam/result/ondemandtest",
  },
  {
    _id: 2,
    name: "Model Test",
    icon: <FaAward />,
    path: "/exam/result/modeltest",
  },
  {
    _id: 3,
    name: "Board Exam",
    icon: <FaAward />,
    path: "/exam/result/boardexam",
  },
];

export default function ExamResultHead() {
  const { pathname } = useLocation();

  return (
    <div className="bg-base-100 py-2.5 px-4 rounded shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-primary font-medium text-xl">Exams Result</h3>
        <Link
          to="/exam-list"
          className="bg-primary text-base-100 px-4 py-1.5 rounded text-xs"
        >
          Exam List
        </Link>
      </div>

      <div className="sm:flex overflow-x-auto gap-2 mt-1.5 horizontal_scroll">
        {tests?.map((test) => (
          <NavLink
            to={test?.path}
            key={test?._id}
            className={({ isActive }) =>
              `flex items-center gap-1.5 border rounded-xl px-2.5 py-1.5 duration-300 ${
                isActive ? "bg-primary text-base-100" : ""
              }`
            }
          >
            <span className="opacity-50 -mt-px text-[13px]">{test?.icon}</span>
            <p className="text-[11px] whitespace-nowrap">{test?.name}</p>

            {pathname === test?.path && <IoCheckmarkDoneOutline />}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
