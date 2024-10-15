import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "../../../../Redux/api/academy/classApi";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useAddAcademyContentMutation } from "../../../../Redux/api/academy/contentApi";
import { useGetAcademyChaptersQuery } from "../../../../Redux/api/academy/chapterApi";
import { useGetAcademySubChaptersQuery } from "../../../../Redux/api/academy/subChapterApi";
import { useGetAcademySubSubChaptersQuery } from "../../../../Redux/api/academy/subSubChapterApi";

export default function AddContent() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    },
  };

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
  useEffect(() => {
    setSelectedChapter(chapter?.data[0]?._id);
  }, [chapter?.data]);

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

  const [addAcademyContent, { isLoading }] = useAddAcademyContentMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const clas = e.target.class.value;
    const subject = e.target.subject.value;
    const chapter = e.target.chapter.value;
    const subChapter = e.target.subChapter.value;
    const subSubChapter = e.target.subSubChapter.value;

    const info = {
      content,
      category,
      class: clas,
      subject,
      chapter,
      subChapter,
      subSubChapter,
    };

    const res = await addAcademyContent(info);

    if (res?.data?.success) {
      Swal.fire("", "content add success", "success");
      navigate("/admin/academy/contents");
    } else {
      Swal.fire("", "Something went wront!", "error");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Add Content</h2>

        <form onSubmit={handleAdd} className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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
              <p className="mb-1 text-nowrap">
                Sub Chapter{" "}
                <small className="text-neutral-content">(optional)</small>
              </p>
              <select
                name="subChapter"
                onChange={(e) => setSelectedSubChapter(e.target.value)}
              >
                <option value="">select sub chapter</option>
                {subChapters?.map((chapter) => (
                  <option key={chapter?._id} value={chapter?._id}>
                    {chapter?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1 text-nowrap">
                Sub Sub Chapter{" "}
                <small className="text-neutral-content">(optional)</small>
              </p>
              <select name="subSubChapter">
                <option value="">select sub sub chapter</option>
                {subSubChapters?.map((chapter) => (
                  <option key={chapter?._id} value={chapter?._id}>
                    {chapter?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className=" mt-3 content">
            <p className="mb-1">Content</p>
            <JoditEditor
              ref={editor}
              value=""
              onBlur={(text) => setContent(text)}
              config={config}
            />
          </div>

          <div className="mt-2">
            <button className="primary_btn">
              {isLoading ? "Loading..." : "Add Content"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
