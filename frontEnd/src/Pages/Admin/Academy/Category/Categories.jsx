import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteAcademyCategoryMutation,
  useGetAcademyCategoriesQuery,
} from "../../../../Redux/api/academy/categoryApi";
import Swal from "sweetalert2";

export default function Categories() {
  const { data, isLoading } = useGetAcademyCategoriesQuery();
  const categories = data?.data;

  const [deleteAcademyCategory] = useDeleteAcademyCategoryMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this category?");
    if (isConfirm) {
      const res = await deleteAcademyCategory(id);
      if (res?.data?.success) {
        Swal.fire("", "category delete success", "success");
      } else {
        Swal.fire("", "something went wront!", "error");
      }
    }
  };

  if (isLoading) {
    return <div className="bg-base-100 shadow rounded h-[80vh]"></div>;
  }

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="border-b p-3 flex justify-between items-center">
        <h2>Academy Category</h2>
        <Link to="/admin/academy/category/add" className="primary_btn">
          Add New Category
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category?._id}>
                <td>{category?.order}</td>
                <td>{category?.name}</td>
                <td>
                  {!category?.fixed && (
                    <div className="flex items-center gap-2 text-lg">
                      <Link
                        to={`/admin/academy/category/edit/${category?._id}`}
                      >
                        <FaEdit />
                      </Link>
                      <button onClick={() => handleDelete(category?._id)}>
                        <MdDeleteForever className="text-xl hover:text-red-500 duration-200" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
