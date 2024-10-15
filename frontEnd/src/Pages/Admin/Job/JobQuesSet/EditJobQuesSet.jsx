import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGetInstitutesQuery } from "../../../../Redux/api/job/instituteApi";
import {
  useGetSingleJobQuesSetQuery,
  useUpdateJobQuesSetMutation,
} from "../../../../Redux/api/job/jobQuesSetApi";
import { useGetYearsQuery } from "../../../../Redux/api/yearApi";

export default function EditJobQuesSet() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetSingleJobQuesSetQuery(id);

  const { data: yearsList } = useGetYearsQuery();
  const years = yearsList?.data;

  let [year, setYear] = useState("");
  let [selectedInstitute, setSelectedInstitute] = useState("");

  useEffect(() => {
    if (data?.success) {
      setYear(data?.data?.year);
      setSelectedInstitute(data?.data?.institute?._id);
    }
  }, [data]);

  const { data: institute } = useGetInstitutesQuery();
  const institutes = institute?.data;

  const [updateJobQuesSet, { isLoading }] = useUpdateJobQuesSetMutation();
  const handleEdit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const institute = e.target.institute.value;
    const year = e.target.year.value;

    const info = {
      name,
      year,
      institute,
    };

    const res = await updateJobQuesSet({ id, info });
    if (res?.data?.success) {
      toast.success("Question set edit success");
      navigate("/admin/job/question-set");
    } else {
      Swal.fire("", "something went wrong!", "error");
      console.log(res);
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3>Edit Question Set</h3>
      </div>
      <div className="p-4">
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <p className="mb-1">Institutes</p>
              <select
                name="institute"
                required
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
              >
                {institutes?.map((u) => (
                  <option key={u?._id} value={u?._id}>
                    {u?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Year</p>
              <select
                name="year"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {years?.map((item) => (
                  <option key={item?._id} value={item?.year}>
                    {item?.year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p className="mb-1.5">Question Set Name</p>
            <textarea name="name" defaultValue={data?.data?.name}></textarea>
          </div>

          <div>
            <button
              disabled={isLoading && "disabled"}
              className="primary_btn text-sm"
            >
              {isLoading ? "Loading..." : "Edit Question Set"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
