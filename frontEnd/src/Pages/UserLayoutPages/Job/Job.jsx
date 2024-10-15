import { useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { PiExamFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import BackBtn from "../../../Components/BackBtn/BackBtn";
import QuestionBank from "./QuestionBank/QuestionBank";
import SubjectWise from "./SubjectWise/SubjectWise";

export default function Job() {
  const [activeCategory, setActiveCategory] = useState(1);

  return (
    <div>
      <div className="bg-base-100 p-4 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="text-primary font-medium text-lg">Job Assistant</h3>
          <BackBtn />
        </div>

        <div className="flex overflow-x-auto gap-3 mt-2">
          <button
            onClick={() => setActiveCategory(1)}
            className={`flex items-center gap-2 border rounded-xl px-2.5 py-1.5 duration-300 ${
              activeCategory === 1
                ? "bg-primary text-white"
                : "hover:border-primary/60 hover:bg-primary/5"
            }`}
          >
            <FaBookReader className="opacity-50 -mt-px text-xs" />
            <p className="text-[11px] whitespace-nowrap">Question Bank</p>

            {activeCategory === 1 && <IoCheckmarkDoneOutline />}
          </button>

          <button
            onClick={() => setActiveCategory(2)}
            className={`flex items-center gap-2 border rounded-xl px-2.5 py-1.5 duration-300 ${
              activeCategory === 2
                ? "bg-primary text-white"
                : "hover:border-primary/60 hover:bg-primary/5"
            }`}
          >
            <FaBookReader className="opacity-50 -mt-px text-xs" />
            <p className="text-[11px] whitespace-nowrap">Subject</p>

            {activeCategory === 2 && <IoCheckmarkDoneOutline />}
          </button>

          <Link
            to="/exam-list?active=job"
            className={`flex items-center gap-2 border rounded-xl px-2.5 py-1.5 duration-300 hover:border-primary/60 hover:bg-primary/5`}
          >
            <PiExamFill className="opacity-50 -mt-px text-sm" />
            <p className="text-[11px] whitespace-nowrap">Model test</p>
          </Link>
        </div>
      </div>

      <div className="mt-2">
        {activeCategory == 1 && <QuestionBank />}
        {activeCategory == 2 && <SubjectWise />}
      </div>
    </div>
  );
}
