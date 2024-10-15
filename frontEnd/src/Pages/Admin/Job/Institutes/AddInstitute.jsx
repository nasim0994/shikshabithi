import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddInstituteMutation } from "../../../../Redux/api/job/instituteApi";

export default function AddInstitute() {
  const navigate = useNavigate();

  const [addInstitute, { isLoading }] = useAddInstituteMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const info = {
      name,
    };

    const res = await addInstitute(info);
    if (res?.data?.success) {
      toast.success("institute add success");
      navigate("/admin/job/institutes");
    } else {
      toast.error("something went wrong!");
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium">Add Institute</h3>
      </div>
      <div className="p-4">
        <form onSubmit={handleAdd}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5">Institute Name</p>
              <input type="text" name="name" />
            </div>
          </div>

          <div className="mt-4">
            <button className="primary_btn" disabled={isLoading && "disabled"}>
              {isLoading ? "Loading..." : "Add Institute"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
