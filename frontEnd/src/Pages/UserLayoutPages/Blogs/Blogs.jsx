import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { HiBuildingLibrary } from "react-icons/hi2";
import { PiBagFill } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useGetAcademySubjectsQuery } from "../../../Redux/api/academy/subjectApi";
import BlogsList from "./BlogsList";
import { MdOutlineClearAll } from "react-icons/md";
import RecentBlogs from "./RecentBlogs";
import RelatedBlogs from "./RelatedBlogs";

let categories = [
  { _id: 1, name: "Academy", icon: <HiBuildingLibrary /> },
  { _id: 2, name: "Admission", icon: <FaBookReader className="text-xs" /> },
  { _id: 3, name: "Job", icon: <PiBagFill className="text-sm" /> },
  { _id: 4, name: "Others", icon: <MdOutlineClearAll className="text-sm" /> },
];

export default function Blogs() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let active = queryParams.get("active");

  const [activeCategory, setActiveCategory] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");

  let query = {};
  if (active == "admission") query["classuuid"] = 200;
  const { data: subject } = useGetAcademySubjectsQuery({ ...query });
  const subjects = subject?.data;

  useEffect(() => {
    if (!active) {
      navigate("/blogs?active=academy");
      setActiveCategory(1);
    } else if (active == "academy") {
      setActiveCategory(1);
    } else if (active == "admission") {
      setActiveCategory(2);
    } else if (active == "job") {
      setActiveCategory(3);
    } else if (active == "others") {
      setActiveCategory(4);
    }
  }, [active, navigate]);

  return (
    <section className="py-5">
      <div className="container">
        <div className="bg-base-100 p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-primary font-semibold text-lg">
              Blogs || Top Study Zone
            </h3>
            <Link to="/blog/add" className="text-xs primary_btn">
              Add Blog
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-2 mt-2">
            {categories?.map((category) => (
              <button
                key={category?._id}
                onClick={() => {
                  setActiveCategory(category?._id);
                  navigate(
                    `/blogs?active=${category?.name.toLocaleLowerCase()}`
                  );
                  setSelectedSubject("");
                }}
                className={`flex items-center gap-2 border rounded-xl px-2.5 py-1.5 duration-300 ${
                  activeCategory === category._id
                    ? "bg-primary text-white"
                    : "hover:border-primary/60 hover:bg-primary/5"
                }`}
              >
                <span className="opacity-50 -mt-px">{category?.icon}</span>
                <p className="text-[11px] whitespace-nowrap">
                  {category?.name}
                </p>

                {activeCategory === category._id && <IoCheckmarkDoneOutline />}
              </button>
            ))}

            {activeCategory !== 4 && (
              <select
                name="subject"
                className="w-28 text-xs rounded-xl border-gray-200 cursor-pointer"
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                }}
                value={selectedSubject}
              >
                <option value="">Filter Subject</option>
                <option value="all">All</option>
                {subjects?.map((s) => (
                  <option key={s?._id} value={s?._id}>
                    {s?.name}-({s?.class?.name})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="mt-2 grid lg:grid-cols-4 gap-3 items-start">
          <BlogsList
            activeCategory={activeCategory}
            selectedSubject={selectedSubject}
          />

          <div>
            <RecentBlogs />
            <RelatedBlogs
              activeCategory={activeCategory}
              selectedSubject={selectedSubject}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
