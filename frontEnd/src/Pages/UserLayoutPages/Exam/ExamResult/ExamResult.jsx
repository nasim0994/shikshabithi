import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaAward } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import OnDemandTest from "./OnDemandTest";
import ModelTest from "./ModelTest/ModelTest";
import BoardExamResult from "./BoardExamResult/BoardExam";

export default function ExamResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let test = queryParams.get("test");
  let category = queryParams.get("category");

  const [active, setActive] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  useEffect(() => {
    if (!test) {
      navigate("/exam-result?test=ondemandtest");
      setActive(1);
    } else if (test == "ondemandtest") {
      setActive(1);
    } else if (test == "modeltest") {
      setActive(2);
    }
  }, [test, navigate]);

  let tests = [
    {
      _id: 1,
      name: "On Demand Test",
      icon: <FaAward />,
    },
    {
      _id: 2,
      name: "Model Test",
      icon: <FaAward />,
    },
    {
      _id: 3,
      name: "Board Exam",
      icon: <FaAward />,
    },
  ];

  return (
    <section>
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

        <div className="sm:flex items-center gap-2">
          <div className="flex overflow-x-auto gap-2 mt-1.5 horizontal_scroll">
            {tests?.map((test) => (
              <button
                key={test?._id}
                onClick={() => {
                  setActive(test?._id);
                  navigate(
                    test?._id == 1
                      ? `/exam-result?test=${test?.name
                          .toLocaleLowerCase()
                          .split(" ")
                          .join("")}`
                      : test?._id == 2
                      ? `/exam-result?test=${test?.name
                          .toLocaleLowerCase()
                          .split(" ")
                          .join("")}&category=${
                          selectedCategory ? selectedCategory : "academy"
                        }`
                      : `/exam-result?test=${test?.name
                          .toLocaleLowerCase()
                          .split(" ")
                          .join("")}`
                  );
                }}
                className={`flex items-center gap-1.5 border rounded-xl px-2.5 py-1.5 duration-300 ${
                  active == test._id
                    ? "bg-primary text-white"
                    : "hover:border-primary/60 hover:bg-primary/5"
                }`}
              >
                <span className="opacity-50 -mt-px text-[13px]">
                  {test?.icon}
                </span>
                <p className="text-[11px] whitespace-nowrap">{test?.name}</p>

                {active == test._id && <IoCheckmarkDoneOutline />}
              </button>
            ))}
          </div>

          {category && (
            <select
              name="category"
              className="w-max text-xs"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                navigate(
                  `/exam-result?test=${test}&category=${e.target.value}`
                );
              }}
            >
              <option value="academy">Academy</option>
              <option value="admission">Admission</option>
              <option value="job">Job</option>
            </select>
          )}
        </div>
      </div>

      {active == 1 && <OnDemandTest />}
      {active == 2 && <ModelTest category={selectedCategory} />}
      {active == 3 && <BoardExamResult />}
    </section>
  );
}
