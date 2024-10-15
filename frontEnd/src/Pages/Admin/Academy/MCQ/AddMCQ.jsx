import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import Select from "react-dropdown-select";

import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "../../../../Redux/api/academy/classApi";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useAddAcademyMCQMutation } from "../../../../Redux/api/academy/mcqApi";

import { useGetAcademyChaptersQuery } from "../../../../Redux/api/academy/chapterApi";
import { useGetAcademySubChaptersQuery } from "../../../../Redux/api/academy/subChapterApi";
import { useGetAcademySubSubChaptersQuery } from "../../../../Redux/api/academy/subSubChapterApi";
import { useGetTagsQuery } from "../../../../Redux/api/tagApi";
import { useGetAdmissionAllQuestionSetQuery } from "../../../../Redux/api/admission/questionSetApi";
import { useSelector } from "react-redux";
import { useGetJobQuesSetQuery } from "../../../../Redux/api/job/jobQuesSetApi";

export default function AddMCQ() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [pointA, setPointA] = useState("");
  const [pointB, setPointB] = useState("");
  const [pointC, setPointC] = useState("");
  const [pointD, setPointD] = useState("");
  const [explain, setExplain] = useState("");

  const { loggedUser } = useSelector((store) => store.user);

  const config = {
    uploader: {
      url: "https://xdsoft.net/jodit/finder/?action=fileUpload",
    },
  };

  //------------------------Category
  const { data: category } = useGetAcademyCategoriesQuery();
  const categories = category?.data;
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    setSelectedCategory(category?.data[0]?._id);
  }, [category?.data]);

  //------------------------Classes
  let query = {};
  query["category"] = selectedCategory;
  const { data: cls } = useGetAcademyClassesQuery({ ...query });
  const classes = cls?.data;
  const [selectedClass, setSelectedClass] = useState("");

  //---------------------Subject
  let subjectQuery = {};
  subjectQuery["cls"] = selectedClass;
  const { data: subject } = useGetAcademySubjectsQuery({ ...subjectQuery });
  const subjects = subject?.data;

  const [selectedSubject, setSelectedSubject] = useState("");

  //---------------------Chapter
  let chapterQuery = {};
  chapterQuery["category"] = selectedCategory;
  chapterQuery["cls"] = selectedClass;
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

  //-------------------tags
  const { data: tag } = useGetTagsQuery({});
  let tags = tag?.data;
  const [selectedTags, setSelectedTags] = useState([]);

  //-------------------sets
  const { data: set } = useGetAdmissionAllQuestionSetQuery({});
  let sets = set?.data;
  const [selectedSets, setSelectedSets] = useState([]);

  //-------------------Job Ques. Sets
  const { data: jobSet } = useGetJobQuesSetQuery({});
  let jobSets = jobSet?.data;
  const [selectedJobSets, setSelectedJobSets] = useState([]);

  const [addAcademyMCQ, { isLoading }] = useAddAcademyMCQMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!loggedUser?.success) return Swal.fire("User not found!");

    const form = e.target;
    const category = form.category.value;
    const cls = form.class.value;
    const subject = form.subject.value;
    const chapter = form.chapter.value;
    const subChapter = form.subChapter.value;
    const subSubChapter = form.subSubChapter.value;
    const ans = form.ans.value;
    const videoLink = form.videoLink.value;

    if (!question) {
      return Swal.fire("", "question is required!", "warning");
    }

    if (!pointA || !pointB || !pointC || !pointD) {
      return Swal.fire("", "Point is required!", "warning");
    }

    const info = {
      user: loggedUser?.data?._id,
      category,
      class: cls,
      subject,
      chapter,
      subChapter,
      subSubChapter,
      question,
      points: [
        { name: "A", title: pointA },
        { name: "B", title: pointB },
        { name: "C", title: pointC },
        { name: "D", title: pointD },
      ],
      ans,
      videoLink,
      explain,
      tags: selectedTags?.map((tag) => tag?._id),
      sets: selectedSets?.map((set) => set?._id),
      jobSets: selectedJobSets?.map((set) => set?._id),
    };

    const res = await addAcademyMCQ(info);

    if (res?.data?.success) {
      Swal.fire("", "MCQ add success", "success");
      navigate("/admin/mcq/all");
    } else {
      Swal.fire("", "something went wront!", "error");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Add MCQ</h2>

        <form onSubmit={handleAdd} className="p-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="mb-1">
                Category Name <sup className="text-red-500 text-xs">*</sup>
              </p>
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
              <p className="mb-1">
                Class Name <sup className="text-red-500 text-xs">*</sup>
              </p>
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
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
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
                onChange={(e) => setSelectedChapter(e.target.value)}
              >
                <option value="">Select Chapter</option>
                {chapters?.map((chapter) => (
                  <option key={chapter?._id} value={chapter?._id}>
                    {chapter?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Sub Chapter</p>
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
            </div>

            <div>
              <p className="mb-1">Sub Sub Chapter</p>
              <select name="subSubChapter">
                <option value="">Select Sub Sub Chapter</option>
                {subSubChapters?.map((chapter) => (
                  <option key={chapter?._id} value={chapter?._id}>
                    {chapter?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-1">
              Question <sup className="text-red-500 text-xs">*</sup>
            </p>
            <JoditEditor
              ref={editor}
              value=""
              onBlur={(text) => setQuestion(text)}
            />
          </div>

          {/* points */}
          <div className="mt-4 border rounded p-3">
            <p className="mb-4">Points</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-1">
                  A <sup className="text-red-500 text-xs">*</sup>
                </p>
                <JoditEditor
                  ref={editor}
                  value=""
                  onBlur={(text) => setPointA(text)}
                />
              </div>
              <div>
                <p className="mb-1">
                  B <sup className="text-red-500 text-xs">*</sup>
                </p>
                <JoditEditor
                  ref={editor}
                  value=""
                  onBlur={(text) => setPointB(text)}
                />
              </div>
              <div>
                <p className="mb-1">
                  C <sup className="text-red-500 text-xs">*</sup>
                </p>
                <JoditEditor
                  ref={editor}
                  value=""
                  onBlur={(text) => setPointC(text)}
                />
              </div>
              <div>
                <p className="mb-1">
                  D <sup className="text-red-500 text-xs">*</sup>
                </p>
                <JoditEditor
                  ref={editor}
                  value=""
                  onBlur={(text) => setPointD(text)}
                  config={config}
                />
              </div>
              <div>
                <p className="mb-1">
                  Ans <sup className="text-red-500 text-xs">*</sup>
                </p>
                <select name="ans">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-1">
              Video Link{" "}
              <span className="text-neutral-content">(optional)</span>
            </p>
            <input type="text" name="videoLink" />
          </div>

          <div className="mt-4">
            <p className="mb-1">Tags</p>
            <Select
              multi
              options={tags}
              labelField="name"
              valueField="name"
              values={selectedTags}
              onChange={(values) => setSelectedTags(values)}
            />
          </div>

          <div className="mt-4">
            <p className="mb-1">Admission Ques. Sets</p>
            <Select
              multi
              options={sets}
              labelField="name"
              valueField="name"
              values={selectedSets}
              onChange={(values) => setSelectedSets(values)}
            />
          </div>

          <div className="mt-4">
            <p className="mb-1">Job Ques. Sets</p>
            <Select
              multi
              options={jobSets}
              labelField="name"
              valueField="name"
              values={selectedJobSets}
              onChange={(values) => setSelectedJobSets(values)}
            />
          </div>

          <div className=" mt-4">
            <p className="mb-1">ব্যাখ্যা</p>
            <JoditEditor
              ref={editor}
              value=""
              onBlur={(text) => setExplain(text)}
            />
          </div>

          <div className="mt-2">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Add MCQ"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
