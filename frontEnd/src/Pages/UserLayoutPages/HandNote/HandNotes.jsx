import { AiOutlineSmallDash } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { HiBuildingLibrary } from "react-icons/hi2";
import { PiBagFill } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useGetAcademySubjectsQuery } from "../../../Redux/api/academy/subjectApi";
import Notes from "./Notes";
import { MdOutlineClearAll } from "react-icons/md";

let categories = [
  { _id: 0, name: "All", icon: <AiOutlineSmallDash /> },
  { _id: 1, name: "Academy", icon: <HiBuildingLibrary /> },
  { _id: 2, name: "Admission", icon: <FaBookReader className="text-xs" /> },
  { _id: 3, name: "Job", icon: <PiBagFill className="text-sm" /> },
  { _id: 4, name: "Others", icon: <MdOutlineClearAll className="text-sm" /> },
];

export default function HandNotes() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let active = queryParams.get("active");
  let searchSubject = queryParams.get("subject");

  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchSubject]);

  let query = {};
  if (active == "admission") query["classuuid"] = 200;
  const { data: subject } = useGetAcademySubjectsQuery({ ...query });
  const subjects = subject?.data;

  useEffect(() => {
    if (!active) {
      setActiveCategory(0);
    } else if (active == "academy") {
      setActiveCategory(1);
    } else if (active == "admission") {
      setActiveCategory(2);
    } else if (active == "job") {
      setActiveCategory(3);
    } else if (active == "others") {
      setActiveCategory(4);
    }
  }, [active]);

  return (
    <div>
      <div className="bg-base-100 p-4 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="text-primary font-medium text-xl">Hand Notes</h3>
          <Link to="/handnote/add" className="text-xs primary_btn">
            Add Hand Note
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-2 mt-2 horizontal_scroll">
          {categories?.map((category) => (
            <button
              key={category?._id}
              onClick={() => {
                setActiveCategory(category?._id);
                setSelectedSubject("");
                if (category?._id === 0) {
                  navigate(`/handnotes`);
                } else {
                  navigate(
                    `/handnotes?active=${category?.name.toLocaleLowerCase()}`
                  );
                }
              }}
              className={`flex items-center gap-2 border rounded-xl px-2.5 py-1.5 duration-300 ${
                activeCategory === category._id
                  ? "bg-primary text-white"
                  : "hover:border-primary/60 hover:bg-primary/5"
              }`}
            >
              <span className="opacity-50 -mt-px">{category?.icon}</span>
              <p className="text-[11px] whitespace-nowrap">{category?.name}</p>

              {activeCategory === category._id && <IoCheckmarkDoneOutline />}
            </button>
          ))}

          {activeCategory !== 4 && (
            <select
              name="subject"
              className="w-28 text-xs rounded-xl border-gray-200 cursor-pointer"
              onChange={(e) => {
                if (e.target.value) {
                  navigate(`/handnotes?subject=${e.target.value}`);
                } else {
                  navigate(`/handnotes`);
                }
              }}
              value={searchSubject || selectedSubject}
            >
              <option value="">All Subjects</option>
              {subjects?.map((s) => (
                <option key={s?._id} value={s?._id}>
                  {s?.name}-({s?.class?.name})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <Notes
        activeCategory={activeCategory}
        selectedSubject={selectedSubject}
        searchSubject={searchSubject}
      />
    </div>
  );
}
