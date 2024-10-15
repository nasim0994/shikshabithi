import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddYearMutation } from "../../../Redux/api/yearApi";

export default function AddYears() {
  const navigate = useNavigate();
  const [addYear, { isLoading }] = useAddYearMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const form = e.target;
    const year = form.year.value;

    const info = {
      year,
    };

    let res = await addYear(info);
    if (res?.data?.success) {
      toast.success("Year add success");
      navigate("/admin/years");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Add Year</h2>

        <form onSubmit={handleAdd} className="p-4">
          <div>
            <p className="mb-1">Year</p>
            <input type="text" name="year" required />
          </div>

          <div className="mt-6">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Add Year"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
