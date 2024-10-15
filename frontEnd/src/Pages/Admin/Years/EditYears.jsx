import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useGetYearQuery, useUpdateYearMutation } from "../../../Redux/api/yearApi";


export default function EditYears() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetYearQuery(id);
  const [updateYear, { isLoading }] = useUpdateYearMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const year = form.year.value;

    const info = {
      year,
    };

    let res = await updateYear({ id, info });

    if (res?.data?.success) {
      toast.success("Year update success");
      navigate("/admin/years");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Update Year</h2>

        <form onSubmit={handleUpdate} className="p-4">
          <div>
            <p className="mb-1">Year</p>
            <input
              type="text"
              name="year"
              required
              defaultValue={data?.data?.year}
            />
          </div>

          <div className="mt-6">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Update Year"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
