import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SetCard from "./SetCard";
import { useGetAdmissionUniversitiesQuery } from "../../../../../Redux/api/admission/universityApi";
import { useGetAdmissionAllQuestionSetQuery } from "../../../../../Redux/api/admission/questionSetApi";
import AdmissionSet from "../../../../../Components/Skeleton/AdmissionSet";

export default function QuestionBank() {
  const navigate = useNavigate();

  const [selectedUniversityId, setselectedUniversityId] = useState("All");
  const [selectedYear, setselectedYear] = useState("All");

  const { data: universityData } = useGetAdmissionUniversitiesQuery();
  const universities = universityData?.data;

  let query = {};
  query["university"] = selectedUniversityId;
  query["year"] = selectedYear;
  const { data: set, isLoading } = useGetAdmissionAllQuestionSetQuery({
    ...query,
  });
  let questionSets = set?.data;

  const handleUniversityChange = (id) => {
    setselectedUniversityId(id);

    navigate(`/admission?university=${id}`);
  };

  const handleYearChange = (year) => {
    setselectedYear(year);
    navigate(`/admission?university=${selectedUniversityId}&year=${year}`);
  };

  if (isLoading) return <AdmissionSet />;

  return (
    <div>
      <div className="flex justify-between items-center text-sm text-neutral bg-base-100 rounded shadow p-3">
        <div>
          <p className="mb-1">Filter University</p>
          <select
            value={selectedUniversityId}
            onChange={(e) => handleUniversityChange(e.target.value)}
          >
            <option value="All">All</option>
            {universities?.map((u) => (
              <option key={u?._id} value={u?._id}>
                {u?.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-1">Filter Year</p>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            <option value="All">All</option>
            <option value="2000">2000</option>
            <option value="2004">2004</option>
            <option value="2020">2020</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {questionSets?.map((set) => (
          <SetCard key={set?._id} set={set} />
        ))}
      </div>
    </div>
  );
}
