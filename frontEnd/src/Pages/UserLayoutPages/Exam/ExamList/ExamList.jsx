import { useEffect, useState } from "react";
import BackBtn from "../../../../Components/BackBtn/BackBtn";
import { HiBuildingLibrary } from "react-icons/hi2";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaBookReader } from "react-icons/fa";
import { PiBagFill } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetModelTestQuery,
  useGetTotalLengthByVendorQuery,
} from "../../../../Redux/api/modelTestApi";
import ExamCard from "./ExamCard";

export default function ExamList() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let active = queryParams.get("active");

  const [activeCategory, setActiveCategory] = useState(1);

  const query = {};
  if (active) query.mainCategory = active;

  const { data: allModeltestData } = useGetModelTestQuery(query);
  const allModeltest = allModeltestData?.data;

  const { loggedUser } = useSelector((state) => state.user);
  const packageData = loggedUser?.data?.package;

  useEffect(() => {
    if (!active) {
      navigate("/exam-list?active=academy");
      setActiveCategory(1);
    } else if (active == "academy") {
      setActiveCategory(1);
    } else if (active == "admission") {
      setActiveCategory(2);
    } else if (active == "job") {
      setActiveCategory(3);
    }
  }, [active, navigate]);

  let categories = [
    { _id: 1, name: "Academy", icon: <HiBuildingLibrary /> },
    { _id: 2, name: "Admission", icon: <FaBookReader className="text-xs" /> },
    { _id: 3, name: "Job", icon: <PiBagFill className="text-sm" /> },
  ];

  const { data } = useGetTotalLengthByVendorQuery();

  const handleAddModelTest = () => {
    if (!packageData?.package) {
      toast.error("You need to purchase a package to add model test");
      return;
    }

    const isExpired = new Date(packageData?.expires) < new Date();
    if (isExpired) {
      toast.error("Your package has expired");
      return;
    }

    const modeltestLimit = parseInt(
      packageData?.package?.feature?.paidModeltestVendor
    );
    const totalLength = parseInt(data?.data);

    if (totalLength >= modeltestLimit) {
      toast.error("You have reached the limit of adding model test");
      return;
    }

    navigate("/modeltest/add");
  };

  return (
    <div>
      <div className="bg-base-100 p-4 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="text-primary font-medium text-xl">
            Exams || Model Test
          </h3>
          <div className="flex items-center gap-2">
            <BackBtn />

            <button
              onClick={handleAddModelTest}
              className="text-xs primary_btn"
            >
              Add Model Test
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 mt-2 horizontal_scroll">
          {categories?.map((category) => (
            <button
              key={category?._id}
              onClick={() => {
                setActiveCategory(category?._id);
                navigate(
                  `/exam-list?active=${category?.name.toLocaleLowerCase()}`
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
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {allModeltest?.map((modelTest, i) => (
          <ExamCard
            key={modelTest?._id}
            modelTest={modelTest}
            i={i}
            packageData={packageData}
          />
        ))}
      </div>
    </div>
  );
}
