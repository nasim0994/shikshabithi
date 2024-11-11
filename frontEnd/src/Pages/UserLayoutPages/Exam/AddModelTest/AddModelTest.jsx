import { useState } from "react";
import Academy from "./Academy";
import { useSelector } from "react-redux";
import Admission from "./Admission";
import Job from "./Job";

export default function AddModelTest() {
  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser?.data?._id;
  const [selectedMainCategory, setSelectedMainCategory] = useState("academy");

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="border-b p-3">
        <h2>Add Model test</h2>
      </div>

      <div className="p-4 text-sm">
        <div className="sm:w-80">
          <p className="mb-1">Main Category</p>
          <select
            name="mainCategory"
            required
            onChange={(e) => setSelectedMainCategory(e.target.value)}
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
          />
        )}
        {selectedMainCategory == "admission" && (
          <Admission
            selectedMainCategory={selectedMainCategory}
            userId={userId}
          />
        )}
        {selectedMainCategory == "job" && (
          <Job selectedMainCategory={selectedMainCategory} userId={userId} />
        )}
      </div>
    </div>
  );
}
