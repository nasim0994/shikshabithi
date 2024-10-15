import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleAdmissionUniversityQuery,
  useUpdateAdmissionUniversityMutation,
} from "../../../../Redux/api/admission/universityApi";
import { toast } from "react-toastify";

export default function EditUniversity() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleAdmissionUniversityQuery(id);
  const [updateAdmissionUniversity, { isLoading }] =
    useUpdateAdmissionUniversityMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const info = { name };

    const res = await updateAdmissionUniversity({ id, info });
    if (res?.data?.success) {
      toast.success("university update success");
      navigate("/admin/admission/universities");
    } else {
      toast.error("something went wrong!");
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3>Edit University</h3>
      </div>
      <div className="p-4">
        <form onSubmit={handleEdit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5">University Name</p>
              <input type="text" name="name" defaultValue={data?.data?.name} />
            </div>
          </div>

          <div className="mt-4">
            <button
              disabled={isLoading && "disabled"}
              className="secondary_btn"
            >
              {isLoading ? "Loading..." : "Update University"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
