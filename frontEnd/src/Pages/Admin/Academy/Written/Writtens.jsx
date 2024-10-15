import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import perser from "html-react-parser";
import {
  useDeleteAcademyWrittenMutation,
  useGetAcademyWrittenQuery,
} from "../../../../Redux/api/academy/writtenApi";
import Spinner from "../../../../Components/Loader/Spinner/Spinner";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "../../../../Redux/api/academy/classApi";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetAcademyChaptersQuery } from "../../../../Redux/api/academy/chapterApi";
import Pagination from "../../../../Components/Pagination/Pagination";

export default function Writtens() {
  const [currentPage, setCurrentPage] = useState(1);
  const query = {};
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
  let classQuery = {};
  classQuery["category"] = selectedCategory;

  const { data: cls } = useGetAcademyClassesQuery({ ...classQuery });
  const classes = cls?.data;
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    setSelectedClass(cls?.data[0]?._id);
  }, [cls?.data]);

  //------------Subject

  let subjectQuery = {};
  subjectQuery["cls"] = selectedClass;
  const { data: subject } = useGetAcademySubjectsQuery({ ...subjectQuery });
  const subjects = subject?.data;
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    setSelectedSubject(subject?.data[0]?._id);
  }, [subject?.data]);

  

  //------------Chapter
  let chapterQuery = {};
  chapterQuery["subject"] = selectedSubject ;
  const { data: chapter } = useGetAcademyChaptersQuery({ ...chapterQuery });
  const chapters = chapter?.data;
  const [selectedChapter, setSelectedChapter] = useState("");

  console.log(chapterQuery);
  

  useEffect(() => {
    setSelectedChapter(chapter?.data[0]?._id);
  }, [chapter?.data]);

  query["subject"] = selectedSubject;
  query["category"] = selectedCategory;
  query["chapter"] = selectedChapter;

  useEffect(() => {
    if (query?.subject) setCurrentPage(1);
  }, [query?.subject]);

  const { data, isLoading } = useGetAcademyWrittenQuery({ ...query });
  const writtens = data?.data;

  const [deleteAcademyWritten] = useDeleteAcademyWrittenMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this items?");
    if (isConfirm) {
      const res = await deleteAcademyWritten(id);
      if (res?.data?.success) {
        toast.success("Written delete success", {
          autoClose: 1000,
        });
      } else {
        toast.error("something went wrong!", {
          autoClose: 1500,
        });
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

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
          value={selectedChapter}
        >
          {chapters?.map((chapter) => (
            <option key={chapter?._id} value={chapter?._id}>
              {chapter?.name}
            </option>
          ))}
          <option value="">All</option>
        </select>
      </div>

      <div className="border-b p-3 flex justify-between items-center">
        <h2>Academy Writtens</h2>
        <Link to="/admin/academy/written/add" className="primary_btn">
          Add New Written
        </Link>
      </div>

      <div className="relative overflow-x-auto min-h-[55vh]">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Written</th>
              <th>Category Name</th>
              <th>Class Name</th>
              <th>Subject Name</th>
              <th>Chapter Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {writtens?.map((written, i) => (
              <tr key={written?._id}>
                <td>{i + 1}</td>
                <td>{written?.question && perser(written?.question)}</td>
                <td>{written?.category?.name}</td>
                <td>{written?.class?.name}</td>
                <td>{written?.subject?.name}</td>
                <td>{written?.chapter?.name}</td>
                <td>
                  <div className="flex items-center gap-2 text-lg">
                    <Link to={`/admin/academy/written/edit/${written?._id}`}>
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(written?._id)}>
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
