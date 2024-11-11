import { useEffect, useState } from "react";
import Academy from "./Academy";
import { useSelector } from "react-redux";
import Admission from "./Admission";
import Job from "./Job";
import { useParams } from "react-router-dom";
import { useGetSingleModelTestQuery } from "../../../../Redux/api/modelTestApi";

export default function AdminEditModelTest() {
  const { id } = useParams();
  const { data } = useGetSingleModelTestQuery(id);
  const modelTest = data?.data;

  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser?.data?._id;
  const [selectedMainCategory, setSelectedMainCategory] = useState("academy");

  useEffect(() => {
    if (modelTest) setSelectedMainCategory(modelTest?.mainCategory);
  }, [modelTest]);

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="border-b p-3">
        <h2>Edit Model Test</h2>
      </div>

      <div className="p-4 text-sm">
        <div className="sm:w-80">
          <p className="mb-1">Main Category</p>
          <select
            name="mainCategory"
            required
            onChange={(e) => setSelectedMainCategory(e.target.value)}
            value={selectedMainCategory}
          >
            <option value="academy">Academy</option>
            <option value="admission">Admission</option>
            <option value="job">Job</option>
          </select>
        </div>

        {selectedMainCategory == "academy" && (
          <Academy
            selectedMainCategory={selectedMainCategory}
            userId={userId}
            modelTest={modelTest}
            id={id}
          />
        )}
        {selectedMainCategory == "admission" && (
          <Admission
            selectedMainCategory={selectedMainCategory}
            userId={userId}
            modelTest={modelTest}
            id={id}
          />
        )}
        {selectedMainCategory == "job" && (
          <Job
            selectedMainCategory={selectedMainCategory}
            userId={userId}
            modelTest={modelTest}
            id={id}
          />
        )}
      </div>
    </div>
  );
}
