import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetAcademyCategoriesQuery } from "/src/Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "/src/Redux/api/academy/classApi";
import { useGetAcademyChaptersQuery } from "/src/Redux/api/academy/chapterApi";
import { useGetAcademySubjectsQuery } from "/src/Redux/api/academy/subjectApi";
import { useGetAcademySubChaptersQuery } from "../../../../../Redux/api/academy/subChapterApi";
import {
  useAddAcademySubSubChapterMutation,
  useGetAcademySubSubChaptersQuery,
} from "../../../../../Redux/api/academy/subSubChapterApi";

export default function AddSubSubChapter() {
  const navigate = useNavigate();

  //------------------------Category
  const { data: category } = useGetAcademyCategoriesQuery();
  const categories = category?.data;
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    if (category?.data?.length > 0) setSelectedCategory(category?.data[0]?._id);
  }, [category?.data]);

  //------------------------Classes
  let query = {};
  query["category"] = selectedCategory;
  const { data: cls } = useGetAcademyClassesQuery({ ...query });
  const classes = cls?.data;
  const [selectedClass, setSelectedClass] = useState("");
  useEffect(() => {
    setSelectedClass(cls?.data[0]?._id);
  }, [cls?.data]);

  //---------------------Subject
  let subjectQuery = {};
  subjectQuery["category"] = selectedCategory;
  subjectQuery["cls"] = selectedClass;
  const { data: subject } = useGetAcademySubjectsQuery({ ...subjectQuery });
  const subjects = subject?.data;
  const [selectedSubject, setSelectedSubject] = useState("");
  useEffect(() => {
    setSelectedSubject(subject?.data[0]?._id);
  }, [subject?.data]);

  //---------------------Chapter
  let chapterQuery = {};
  chapterQuery["category"] = selectedCategory;
  chapterQuery["cls"] = selectedClass;
  chapterQuery["subject"] = selectedSubject;
  const { data: chapter } = useGetAcademyChaptersQuery({ ...chapterQuery });
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
  const { data } = useGetAcademySubSubChaptersQuery({
    ...subSubChapterQuery,
  });
  const subSubChapters = data?.data;

  const [addAcademySubSubChapter, { isLoading }] =
    useAddAcademySubSubChapterMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const order = e.target.order.value;
    const category = e.target.category.value;
    const clas = e.target.class.value;
    const subject = e.target.subject.value;
    const chapter = e.target.chapter.value;
    const subChapter = e.target.subChapter.value;

    const info = {
      name,
      order,
      category,
      class: clas,
      subject,
      chapter,
      subChapter,
    };

    const res = await addAcademySubSubChapter(info);

    if (res?.data?.success) {
      Swal.fire("", "sub sub chapter add success", "success");
      navigate("/admin/academy/sub-sub-chapters");
    } else {
      Swal.fire("", "Something went wront!", "error");
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">
          Add Sub Sub Chapter
        </h2>

        <form onSubmit={handleAdd} className="p-4">
          <div className="grid sm:grid-cols-5 gap-4">
            <div>
              <p className="mb-1">Category Name</p>
              <select
                name="category"
                required
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories?.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Class Name</p>
              <select
                name="class"
                required
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes?.map((clas) => (
                  <option key={clas?._id} value={clas?._id}>
                    {clas?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Subject Name</p>
              <select
                name="subject"
                required
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects?.map((subject) => (
                  <option key={subject?._id} value={subject?._id}>
                    {subject?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Chapter Name</p>
              <select
                name="chapter"
                required
                onChange={(e) => setSelectedChapter(e.target.value)}
              >
                {chapters?.map((chapter) => (
                  <option key={chapter?._id} value={chapter?._id}>
                    {chapter?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Sub Chapter Name</p>
              <select
                name="subChapter"
                required
                onChange={(e) => setSelectedSubChapter(e.target.value)}
              >
                {subChapters?.map((chapter) => (
                  <option key={chapter?._id} value={chapter?._id}>
                    {chapter?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <p className="mb-1">Sub Sub Chapter Name</p>
              <input type="text" name="name" required />
            </div>
            <div>
              <p className="mb-1">Order</p>
              <input
                type="number"
                name="order"
                required
                value={subSubChapters?.length ? subSubChapters?.length + 1 : 1}
              />
            </div>
          </div>

          <div className="mt-4">
            <button className="primary_btn">
              {isLoading ? "Loading..." : "Add Sub Chapter"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
