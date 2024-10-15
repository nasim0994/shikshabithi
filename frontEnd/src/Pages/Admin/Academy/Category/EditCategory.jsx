import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleAcademyCategoryQuery,
  useUpdateAcademyCategoryMutation,
} from "../../../../Redux/api/academy/categoryApi";
import Swal from "sweetalert2";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleAcademyCategoryQuery(id);
  const category = data?.data;

  const [updateAcademyCategory, { isLoading }] =
    useUpdateAcademyCategoryMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const order = category?.order;

    const info = {
      name,
      order,
    };

    const res = await updateAcademyCategory({ id, info });
    console.log(res);
    if (res?.data?.success) {
      Swal.fire("", "Category update success", "success");
      navigate("/admin/academy/categories");
    } else {
      Swal.fire("", "Something went wront!", "error");
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Edit Category</h2>

        <form onSubmit={handleUpdate} className="p-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="mb-1">Category Name</p>
              <input
                type="text"
                name="name"
                required
                defaultValue={category?.name}
              />
            </div>
          </div>

          <div className="mt-2">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Edit Category"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
