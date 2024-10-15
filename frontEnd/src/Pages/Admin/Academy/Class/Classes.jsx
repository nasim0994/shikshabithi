import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteAcademyClassMutation,
  useGetAcademyClassesQuery,
} from "../../../../Redux/api/academy/classApi";
import Swal from "sweetalert2";
import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import { useEffect, useState } from "react";

export default function Classes() {
  const { data: category } = useGetAcademyCategoriesQuery();
  const categories = category?.data;

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setSelectedCategory(category?.data[0]?._id);
  }, [category?.data]);

  let query = {};
  query["category"] = selectedCategory;
  const { data, isLoading } = useGetAcademyClassesQuery({ ...query });
  const classes = data?.data;

  const [deleteAcademyClass] = useDeleteAcademyClassMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this category?");
    if (isConfirm) {
      const res = await deleteAcademyClass(id);
      if (res?.data?.success) {
        Swal.fire("", "Class delete success", "success");
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
      <div>
        <div className="border-b p-3 flex justify-between items-center">
          <h2>Academy Classes</h2>
          <Link
            to={`/admin/academy/category-${selectedCategory}/class/add`}
            className="primary_btn"
          >
            Add New Class
          </Link>
        </div>

        <div className="p-4 flex items-center gap-3 text-[15px]">
          <p className="text-neutral-content">Filter Subject:</p>
          <select
            name="subject"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="w-max"
          >
            {categories?.map((subject) => (
              <option key={subject?._id} value={subject?._id}>
                {subject?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Class Name</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes?.length > 0 ? (
                classes?.map((clas) => (
                  <tr key={clas?._id}>
                    <td>{clas?.order}</td>
                    <td>{clas?.name}</td>
                    <td>{clas?.category?.name}</td>
                    <td>
                      <div className="flex items-center gap-2 text-lg">
                        <Link to={`/admin/academy/class/edit/${clas?._id}`}>
                          <FaEdit />
                        </Link>
                        {!clas?.fixed && (
                          <button onClick={() => handleDelete(clas?._id)}>
                            <MdDeleteForever className="text-xl hover:text-red-500 duration-200" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-red-500 text-[15px]">No Class Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
