import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTagQuery,
  useUpdateTagMutation,
} from "../../../Redux/api/tagApi";

export default function EditTag() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetTagQuery(id);
  const [updateTag, { isLoading }] = useUpdateTagMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;

    const info = {
      name,
    };

    let res = await updateTag({ id, info });

    if (res?.data?.success) {
      toast.success("tag update success");
      navigate("/admin/tags");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Update Tag</h2>

        <form onSubmit={handleUpdate} className="p-4">
          <div>
            <p className="mb-1">Name</p>
            <input
              type="text"
              name="name"
              required
              defaultValue={data?.data?.name}
            />
          </div>

          <div className="mt-6">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Update Tag"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
