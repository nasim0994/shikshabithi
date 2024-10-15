import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useDeleteAcademyChapterMutation,
  useGetAcademyChaptersQuery,
} from "../../../../Redux/api/academy/chapterApi";
import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "../../../../Redux/api/academy/classApi";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";

export default function Chapters() {
  //----------Category
  const { data: category } = useGetAcademyCategoriesQuery();
  const categories = category?.data;
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setSelectedCategory(category?.data[0]?._id);
  }, [category?.data]);

  //----------Class
  let query = {};
  query["category"] = selectedCategory;
  const { data: cls } = useGetAcademyClassesQuery({ ...query });
  const classes = cls?.data;
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    setSelectedClass(cls?.data[0]?._id);
  }, [cls?.data]);

  //------------Subject
  let subjectQuery = {};
  subjectQuery["category"] = selectedCategory;
  subjectQuery["cls"] = selectedClass;
  const { data: subject } = useGetAcademySubjectsQuery({ ...subjectQuery });
  const subjects = subject?.data;
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    setSelectedSubject(subject?.data[0]?._id);
  }, [subject?.data]);

  let chapterQuery = {};
  chapterQuery["subject"] = selectedSubject;
  const { data, isLoading } = useGetAcademyChaptersQuery({ ...chapterQuery });
  const chapters = data?.data;

  const [deleteAcademyChapter] = useDeleteAcademyChapterMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this chapter?");
    if (isConfirm) {
      const res = await deleteAcademyChapter(id);
      if (res?.data?.success) {
        Swal.fire("", "chapter delete success", "success");
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
        <h2>Academy Chapter</h2>
        <Link to="/admin/academy/chapter/add" className="primary_btn">
          Add New Chapter
        </Link>
      </div>

      <div className="md:w-2/3 grid sm:grid-cols-3 gap-4 p-4">
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

        <select
          name="subject"
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects?.map((subject) => (
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
              <th>Chapter Name</th>
              <th>Category Name</th>
              <th>Class Name</th>
              <th>Subject Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chapters?.map((chapter) => (
              <tr key={chapter?._id}>
                <td>{chapter?.order}</td>
                <td>{chapter?.name}</td>
                <td>{chapter?.category?.name}</td>
                <td>{chapter?.class?.name}</td>
                <td>{chapter?.subject?.name}</td>
                <td>
                  <div className="flex items-center gap-2 text-lg">
                    <Link to={`/admin/academy/chapter/edit/${chapter?._id}`}>
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(chapter?._id)}>
                      <MdDeleteForever className="text-xl hover:text-red-500 duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
