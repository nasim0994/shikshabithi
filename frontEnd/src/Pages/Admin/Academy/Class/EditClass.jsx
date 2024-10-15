import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleAcademyClassQuery,
  useUpdateAcademyClassMutation,
} from "../../../../Redux/api/academy/classApi";
import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import Swal from "sweetalert2";

export default function EditClass() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetSingleAcademyClassQuery(id);
  const clas = data?.data;

  const { data: categoryData } = useGetAcademyCategoriesQuery();
  const categories = categoryData?.data;

  const [updateAcademyClass, { isLoading }] = useUpdateAcademyClassMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const order = clas?.order;
    const category = e.target.category.value;

    const info = {
      name,
      order,
      category,
    };

    const res = await updateAcademyClass({ id, info });
    if (res?.data?.success) {
      Swal.fire("", "Class update success", "success");
      navigate("/admin/academy/classes");
    } else {
      Swal.fire("", "Something went wront!", "error");
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Edit Class</h2>

        <form onSubmit={handleUpdate} className="p-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <p className="mb-1">Class Name</p>
              <input
                type="text"
                name="name"
                required
                defaultValue={clas?.name}
              />
            </div>

            <div>
              <p className="mb-1">Category Name</p>
              <select
                name="category"
                required
                defaultValue={clas?.category?._id}
              >
                <option
                  className="bg-primary text-base-100"
                  value={clas?.category?._id}
                >
                  {clas?.category?.name}
                </option>
                {categories?.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-2">
            <button className="primary_btn">
              {isLoading ? "Loading..." : "Edit Class"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
