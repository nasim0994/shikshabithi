import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import perser from "html-react-parser";
import {
  useDeleteAcademyMCQMutation,
  useGetAcademyMCQQuery,
} from "../../../../Redux/api/academy/mcqApi";
import Swal from "sweetalert2";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "../../../../Redux/api/academy/classApi";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetAcademyChaptersQuery } from "../../../../Redux/api/academy/chapterApi";
import { useGetAcademySubChaptersQuery } from "../../../../Redux/api/academy/subChapterApi";
import { useGetAcademySubSubChaptersQuery } from "../../../../Redux/api/academy/subSubChapterApi";

export default function MCQ() {
  const [currentPage, setCurrentPage] = useState(1);
  let query = {};
  query["page"] = currentPage;
  query["limit"] = 7;

  //----------Category
  const { data: category } = useGetAcademyCategoriesQuery();
  const categories = category?.data;
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setSelectedCategory(category?.data[0]?._id);
  }, [category?.data]);

  //----------Class
  let clsQuery = {};
  clsQuery["category"] = selectedCategory;
  const { data: cls } = useGetAcademyClassesQuery({ ...clsQuery });
  const classes = cls?.data;
  const [selectedClass, setSelectedClass] = useState("");

  //------------Subject
  let subjectQuery = {};
  subjectQuery["cls"] = selectedClass;
  const { data: subject } = useGetAcademySubjectsQuery({ ...subjectQuery });
  const subjects = subject?.data;
  const [selectedSubject, setSelectedSubject] = useState("");

  //------------chapter
  let chapterQuery = {};
  chapterQuery["subject"] = selectedSubject;
  const { data: chapter } = useGetAcademyChaptersQuery({ ...chapterQuery });
  const chapters = chapter?.data;
  const [selectedChapter, setSelectedChapter] = useState("");

  //---------------------Sub Chapter
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

  //---------------------Sub Sub Chapter
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

  query["category"] = selectedCategory;
  query["cls"] = selectedClass;
  query["subject"] = selectedSubject;
  query["chapter"] = selectedChapter;
  query["subChapter"] = selectedSubChapter;
  query["subSubChapter"] = selectedSubSubChapter;

  useEffect(() => {
    if (query?.category) {
      setCurrentPage(1);
    }
  }, [query?.category]);

  const { data } = useGetAcademyMCQQuery({ ...query });
  const mcqs = data?.data;

  //-------------Delete
  const [deleteAcademyMCQ] = useDeleteAcademyMCQMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this category?");
    if (isConfirm) {
      const res = await deleteAcademyMCQ(id);
      if (res?.data?.success) {
        Swal.fire("", "MCQ delete success", "success");
      } else {
        Swal.fire("", "something went wront!", "error");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 shadow rounded pb-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
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
          <option value="">All Class</option>
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
          <option value="">All Subject</option>
          {subjects?.map((subject) => (
            <option key={subject?._id} value={subject?._id}>
              {subject?.name}
            </option>
          ))}
        </select>

        <select
          name="chapter"
          onChange={(e) => setSelectedChapter(e.target.value)}
          value={selectedChapter}
        >
          <option value="">All Chapter</option>
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
          <option value="">All Sub Chapter</option>
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
          <option value="">All Sub Sub Chapter</option>
          {subSubChapters?.map((chapter) => (
            <option key={chapter?._id} value={chapter?._id}>
              {chapter?.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border-b p-3 flex justify-between items-center">
        <h2>Academy MCQ</h2>
        <Link to="/admin/mcq/add" className="primary_btn">
          Add New MCQ
        </Link>
      </div>

      <div className="relative overflow-x-auto min-h-[55vh]">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>MCQ</th>
              <th>Category</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Chapter</th>
              <th>Sub Chapter</th>
              <th>Sub Sub Chapter</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mcqs?.map((mcq, i) => (
              <tr key={mcq?._id}>
                <td>{i + 1}</td>
                <td>{mcq?.question && perser(mcq?.question)}</td>
                <td>{mcq?.category?.name}</td>
                <td>{mcq?.class?.name}</td>
                <td>{mcq?.subject?.name}</td>
                <td>{mcq?.chapter?.name}</td>
                <td>{mcq?.subChapter?.name}</td>
                <td>{mcq?.subSubChapter?.name}</td>
                <td>
                  <div className="flex items-center gap-2 text-lg">
                    <Link to={`/admin/mcq/edit/${mcq?._id}`}>
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(mcq?._id)}>
                      <MdDeleteForever className="text-xl hover:text-red-500 duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        pages={data?.meta?.pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
