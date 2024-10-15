import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteAcademySubjectMutation,
  useGetAcademySubjectsQuery,
} from "../../../../Redux/api/academy/subjectApi";
import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "../../../../Redux/api/academy/classApi";

export default function Subject() {
  const { data: category } = useGetAcademyCategoriesQuery();
  const categories = category?.data;
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (category?.data?.length > 0) setSelectedCategory(category?.data[0]?._id);
  }, [category]);

  let query = {};
  query["category"] = selectedCategory;
  const { data: cls } = useGetAcademyClassesQuery({ ...query });
  const classes = cls?.data;

  const [selectedClass, setSelectedClass] = useState("");
  useEffect(() => {
    if (cls?.data?.length > 0) {
      setSelectedClass(cls?.data[0]?._id);
    } else {
      setSelectedClass("");
    }
  }, [category, cls]);

  let subjectQuery = {};
  subjectQuery["category"] = selectedCategory;
  subjectQuery["cls"] = selectedClass;
  const { data, isLoading } = useGetAcademySubjectsQuery({ ...subjectQuery });
  const subjects = data?.data;

  const [deleteAcademySubject] = useDeleteAcademySubjectMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this category?");
    if (isConfirm) {
      const res = await deleteAcademySubject(id);
      if (res?.data?.success) {
        Swal.fire("", "Subject delete success", "success");
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
      <div className="md:w-1/2 grid sm:grid-cols-2 gap-4 p-4">
        <select
          name="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories?.map((category) => (
            <option key={category?._id} value={category?._id}>
              {category?.name}
            </option>
          ))}
        </select>

        <select name="cls" onChange={(e) => setSelectedClass(e.target.value)}>
          {classes?.map((cls) => (
            <option key={cls?._id} value={cls?._id}>
              {cls?.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <div className="border-b p-3 flex justify-between items-center">
          <h2>Academy Subject</h2>
          <Link to="/admin/academy/subject/add" className="primary_btn">
            Add New Subject
          </Link>
        </div>

        <div className="relative overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Subject Name</th>
                <th>Class Name</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects?.length > 0 ? (
                subjects?.map((subject) => (
                  <tr key={subject?._id}>
                    <td>{subject?.order}</td>
                    <td>{subject?.name}</td>
                    <td>{subject?.class?.name}</td>
                    <td>{subject?.category?.name}</td>
                    <td>
                      <div className="flex items-center gap-2 text-lg">
                        <Link
                          to={`/admin/academy/subject/edit/${subject?._id}`}
                        >
                          <FaEdit />
                        </Link>
                        <button onClick={() => handleDelete(subject?._id)}>
                          <MdDeleteForever className="text-xl hover:text-red-500 duration-200" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-[15px] text-red-500">
                    Subject Not Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
