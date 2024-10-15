import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAddJobQuesSetMutation } from "../../../../Redux/api/job/jobQuesSetApi";
import { useGetInstitutesQuery } from "../../../../Redux/api/job/instituteApi";
import { useGetYearsQuery } from "../../../../Redux/api/yearApi";

export default function AddJobQuesSet() {
  const navigate = useNavigate();
  const { data } = useGetInstitutesQuery();
  const institutes = data?.data;

  const [addJobQuesSet, { isLoading }] = useAddJobQuesSetMutation();

  const { data: yearsList } = useGetYearsQuery();
  const years = yearsList?.data;

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const institute = e.target.institute.value;
    const year = e.target.year.value;

    const info = {
      name,
      year,
      institute,
    };

    const res = await addJobQuesSet(info);
    if (res?.data?.success) {
      toast.success("Question set add success");
      navigate("/admin/job/question-set");
    } else {
      Swal.fire("", "something went wrong!", "error");
      console.log(res);
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium">Add Question Set</h3>
      </div>
      <div className="p-4">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <p className="mb-1">Institutes</p>
              <select name="institute" required>
                {institutes?.map((u) => (
                  <option key={u?._id} value={u?._id}>
                    {u?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Year</p>
              <select name="year" required>
                {years?.map((item) => (
                  <option key={item?._id} value={item?.year}>
                    {item?.year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p className="mb-1">Set Name</p>
            <textarea name="name"></textarea>
          </div>

          <div>
            <button
              disabled={isLoading && "disabled"}
              className="primary_btn text-sm"
            >
              {isLoading ? "Loading..." : "Add Question Set"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
