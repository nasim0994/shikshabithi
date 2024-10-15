import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useGetAcademyCategoriesQuery } from "/src/Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "/src/Redux/api/academy/classApi";
import { useGetAcademySubjectsQuery } from "/src/Redux/api/academy/subjectApi";
import { useGetAcademyChaptersQuery } from "/src/Redux/api/academy/chapterApi";
import { useGetAcademySubChaptersQuery } from "../../../../../Redux/api/academy/subChapterApi";
import {
  useDeleteAcademySubSubChapterMutation,
  useGetAcademySubSubChaptersQuery,
} from "../../../../../Redux/api/academy/subSubChapterApi";

export default function SubSubChapters() {
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

  //------------Chapter
  let chapterQuery = {};
  chapterQuery["subject"] = selectedSubject;
  const { data: chapter } = useGetAcademyChaptersQuery({
    ...chapterQuery,
  });
  const chapters = chapter?.data;
  const [selectedChapter, setSelectedChapter] = useState("");

  useEffect(() => {
    setSelectedChapter(chapter?.data[0]?._id);
  }, [chapter]);

  // ------------------sub chapter
  let subChapterQuery = {};
  subChapterQuery["category"] = selectedCategory;
  subChapterQuery["cls"] = selectedClass;
  subChapterQuery["subject"] = selectedSubject;
  subChapterQuery["chapter"] = selectedChapter;
  const { data: subChapter } = useGetAcademySubChaptersQuery({
    ...subChapterQuery,
  });
  const subChapters = subChapter?.data;

  const [selectedSubChapter, setSelectedSubChapter] = useState("");
  useEffect(() => {
    setSelectedSubChapter(subChapter?.data[0]?._id);
  }, [subChapter]);

  //------------Sub Sub Chapter
  let subSubChapterQuery = {};
  subSubChapterQuery["category"] = selectedCategory;
  subSubChapterQuery["cls"] = selectedClass;
  subSubChapterQuery["subject"] = selectedSubject;
  subSubChapterQuery["chapter"] = selectedChapter;
  subSubChapterQuery["subChapter"] = selectedSubChapter;
  const { data, isLoading } = useGetAcademySubSubChaptersQuery({
    ...subSubChapterQuery,
  });
  const subSubChapters = data?.data;

  const [deleteAcademySubSubChapter] = useDeleteAcademySubSubChapterMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this chapter?");
    if (isConfirm) {
      const res = await deleteAcademySubSubChapter(id);
      if (res?.data?.success) {
        Swal.fire("", "sub sub chapter delete success", "success");
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
        <h2>Academy Sub Sub Chapter</h2>
        <Link to="/admin/academy/sub-sub-chapter/add" className="primary_btn">
          Add New
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        <select
          name="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
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

        <select
          name="chapter"
          onChange={(e) => setSelectedChapter(e.target.value)}
        >
          {chapters?.map((chapter) => (
            <option key={chapter?._id} value={chapter?._id}>
              {chapter?.name}
            </option>
          ))}
        </select>

        <select
          name="subChapter"
          onChange={(e) => setSelectedSubChapter(e.target.value)}
        >
          {subChapters?.map((chapter) => (
            <option key={chapter?._id} value={chapter?._id}>
              {chapter?.name}
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
              <th>Chapter Name</th>
              <th>Sub Chapter Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subSubChapters?.length > 0 ? (
              subSubChapters?.map((chapter) => (
                <tr key={chapter?._id}>
                  <td>{chapter?.order}</td>
                  <td>{chapter?.name}</td>
                  <td>{chapter?.category?.name}</td>
                  <td>{chapter?.class?.name}</td>
                  <td>{chapter?.subject?.name}</td>
                  <td>{chapter?.chapter?.name}</td>
                  <td>{chapter?.subChapter?.name}</td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <Link
                        to={`/admin/academy/sub-sub-chapter/edit/${chapter?._id}`}
                      >
                        <FaEdit />
                      </Link>
                      <button onClick={() => handleDelete(chapter?._id)}>
                        <MdDeleteForever className="text-xl hover:text-red-500 duration-200" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-[15px] text-red-500">
                  Sub-SubChapters Not Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
