import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { HiBuildingLibrary } from "react-icons/hi2";
import { PiBagFill } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useGetAcademySubjectsQuery } from "../../../Redux/api/academy/subjectApi";
import Questions from "./Questions";
import { MdOutlineClearAll } from "react-icons/md";
import { useSelector } from "react-redux";
import { useGetAskQuestionLengthByUserQuery } from "../../../Redux/api/askQuestionApi";
import { toast } from "react-toastify";

let categories = [
  { _id: 1, name: "Academy", icon: <HiBuildingLibrary /> },
  { _id: 2, name: "Admission", icon: <FaBookReader className="text-xs" /> },
  { _id: 3, name: "Job", icon: <PiBagFill className="text-sm" /> },
  { _id: 4, name: "Others", icon: <MdOutlineClearAll className="text-sm" /> },
];

export default function AskQuestion() {
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;
  const { data } = useGetAskQuestionLengthByUserQuery();

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
      navigate("/discussions?active=academy");
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

  const handleAddAskQuestion = () => {
    const askQuestionLength = data?.data;
    const askQuestionLimit = parseInt(
      user?.package?.package?.feature?.askQuestion
    );

    const expiresAt = new Date(user?.package?.expires);
    const isExpired = expiresAt < new Date();

    if (!user?.package?.package) {
      toast.error("Please buy a package to ask questions");
      return navigate("/packages");
    } else if (isExpired) {
      toast.error("Your package has been expired");
      return navigate("/packages");
    }

    if (askQuestionLength >= askQuestionLimit) {
      toast.error("You have reached the limit of asking questions");
      return;
    }

    navigate("/ask-question/add");
  };

  return (
    <div>
      <div className="bg-base-100 p-4 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="text-primary font-medium text-xl">Ask Questions</h3>
          <button
            onClick={handleAddAskQuestion}
            className="text-xs primary_btn"
          >
            Add Ask Question?
          </button>
        </div>

        <div className="grid grid-cols-2 sm:flex gap-2 mt-2">
          {categories?.map((category) => (
            <button
              key={category?._id}
              onClick={() => {
                setActiveCategory(category?._id);
                setSelectedSubject("");
                navigate(
                  `/discussions?active=${category?.name.toLocaleLowerCase()}`
                );
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
              onChange={(e) => setSelectedSubject(e.target.value)}
              value={selectedSubject}
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

      <Questions
        activeCategory={activeCategory}
        selectedSubject={selectedSubject}
      />
    </div>
  );
}
