import {
  useAddAcademyCategoryMutation,
  useGetAcademyCategoriesQuery,
} from "../../../../Redux/api/academy/categoryApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const navigate = useNavigate();
  const { data } = useGetAcademyCategoriesQuery();
  const [addAcademyCategory, { isLoading }] = useAddAcademyCategoryMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const order = data?.data?.length ? data?.data?.length + 1 : 1;

    const info = {
      name,
      order,
    };

    const res = await addAcademyCategory(info);

    if (res?.data?.success) {
      Swal.fire("", "Category add success", "success");
      navigate("/admin/academy/categories");
    } else {
      Swal.fire("", "Something went wront!", "error");
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Add Category</h2>

        <form onSubmit={handleAdd} className="p-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="mb-1">Category Name</p>
              <input type="text" name="name" required />
            </div>
          </div>

          <div className="mt-2">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
