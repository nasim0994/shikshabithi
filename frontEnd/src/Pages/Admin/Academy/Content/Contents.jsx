import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useDeleteAcademyContentMutation,
  useGetAcademyContentsQuery,
} from "../../../../Redux/api/academy/contentApi";
import Swal from "sweetalert2";
import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "../../../../Redux/api/academy/classApi";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetAcademyChaptersQuery } from "../../../../Redux/api/academy/chapterApi";
import { useGetAcademySubChaptersQuery } from "../../../../Redux/api/academy/subChapterApi";
import { useGetAcademySubSubChaptersQuery } from "../../../../Redux/api/academy/subSubChapterApi";

export default function Contents() {
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

  //------------Sub Sub Chapter
  let subSubChapterQuery = {};
  subSubChapterQuery["category"] = selectedCategory;
  subSubChapterQuery["cls"] = selectedClass;
  subSubChapterQuery["subject"] = selectedSubject;
  subSubChapterQuery["chapter"] = selectedChapter;
  subSubChapterQuery["subChapter"] = selectedSubChapter;
  const { data: subSubChapter } = useGetAcademySubSubChaptersQuery({
    ...subSubChapterQuery,
  });
  const subSubChapters = subSubChapter?.data;
  const [selectedSubSubChapter, setSelectedSubSubChapter] = useState("");

  //------------Contents
  let scontentQuery = {};
  scontentQuery["category"] = selectedCategory;
  scontentQuery["cls"] = selectedClass;
  scontentQuery["subject"] = selectedSubject;
  scontentQuery["chapter"] = selectedChapter;
  scontentQuery["subChapter"] = selectedSubChapter;
  scontentQuery["subSubChapter"] = selectedSubSubChapter;
  const { data, isLoading } = useGetAcademyContentsQuery({ ...scontentQuery });
  const contents = data?.data;

  const [deleteAcademyClass] = useDeleteAcademyContentMutation();

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
      <div className="border-b p-3 flex justify-between items-center">
        <h2>Academy Contents</h2>
        <Link to="/admin/academy/content/add" className="primary_btn">
          Add New Contents
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
          <option value="">Select Sub Chapter</option>
          {subChapters?.map((chapter) => (
            <option key={chapter?._id} value={chapter?._id}>
              {chapter?.name}
            </option>
          ))}
        </select>

        <select
          name="subSubChapter"
          onChange={(e) => setSelectedSubSubChapter(e.target.value)}
        >
          <option value="">Select Sub Sub Chapter</option>
          {subSubChapters?.map((chapter) => (
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
              <th>Content</th>
              <th>Category Name</th>
              <th>Class Name</th>
              <th>Subject Name</th>
              <th>Chapter Name</th>
              <th>Sub Chapter</th>
              <th>Sub Sub Chapter</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contents?.length > 0 ? (
              contents?.map((content, i) => (
                <tr key={content?._id}>
                  <td>Content {i + 1}</td>
                  <td>{content?.category?.name}</td>
                  <td>{content?.class?.name}</td>
                  <td>{content?.subject?.name}</td>
                  <td>{content?.chapter?.name}</td>
                  <td>{content?.subChapter?.name}</td>
                  <td>{content?.subSubChapter?.name}</td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <Link to={`/admin/academy/content/edit/${content?._id}`}>
                        <FaEdit />
                      </Link>
                      <button onClick={() => handleDelete(content?._id)}>
                        <MdDeleteForever className="text-xl hover:text-red-500 duration-200" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-red-500 text-sm">Content Not Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
