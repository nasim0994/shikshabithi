import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddTagMutation } from "../../../Redux/api/tagApi";

export default function AddTag() {
  const navigate = useNavigate();
  const [addTag, { isLoading }] = useAddTagMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;

    const info = {
      name,
    };

    let res = await addTag(info);
    if (res?.data?.success) {
      toast.success("tag add success");
      navigate("/admin/tags");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Add Tag</h2>

        <form onSubmit={handleAdd} className="p-4">
          <div>
            <p className="mb-1">Name</p>
            <input type="text" name="name" required />
          </div>

          <div className="mt-6">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Add Tag"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
