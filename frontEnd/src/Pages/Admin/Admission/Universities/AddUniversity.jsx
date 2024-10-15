import { toast } from "react-toastify";
import { useAddAdmissionUniversityMutation } from "../../../../Redux/api/admission/universityApi";
import { useNavigate } from "react-router-dom";

export default function AddUniversity() {
  const navigate = useNavigate();

  const [addAdmissionUniversity, { isLoading }] =
    useAddAdmissionUniversityMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const info = {
      name,
    };

    const res = await addAdmissionUniversity(info);
    if (res?.data?.success) {
      toast.success("university add success");
      navigate("/admin/admission/universities");
    } else {
      toast.error("something went wrong!");
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3>Add University</h3>
      </div>
      <div className="p-4">
        <form onSubmit={handleAdd}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5">University Name</p>
              <input type="text" name="name" />
            </div>
          </div>

          <div className="mt-4">
            <button
              className="secondary_btn"
              disabled={isLoading && "disabled"}
            >
              {isLoading ? "Loading..." : "Add University"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
