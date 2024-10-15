import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetSingleInstituteQuery,
  useUpdateInstituteMutation,
} from "../../../../Redux/api/job/instituteApi";

export default function EditInstitute() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleInstituteQuery(id);
  const [updateInstitute, { isLoading }] = useUpdateInstituteMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const info = { name };

    const res = await updateInstitute({ id, info });
    if (res?.data?.success) {
      toast.success("institute update success");
      navigate("/admin/job/institutes");
    } else {
      toast.error("something went wrong!");
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h2>Edit Institute</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleEdit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5">Institute Name</p>
              <input type="text" name="name" defaultValue={data?.data?.name} />
            </div>
          </div>

          <div className="mt-4">
            <button
              disabled={isLoading && "disabled"}
              className="primary_btn text-sm"
            >
              {isLoading ? "Loading..." : "Update Institute"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
