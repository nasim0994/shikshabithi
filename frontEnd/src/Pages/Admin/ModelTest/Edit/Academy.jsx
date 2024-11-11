import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "../../../../Redux/api/academy/classApi";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetAcademyChaptersQuery } from "../../../../Redux/api/academy/chapterApi";
import { useGetAcademyMCQQuery } from "../../../../Redux/api/academy/mcqApi";
import { useUpdateModelTestMutation } from "../../../../Redux/api/modelTestApi";

export default function Academy({ selectedMainCategory, modelTest, id }) {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedNegativeMark, setSelectedNegativeMark] = useState("");

  const [selectedMcqs, setSelectedMcqs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (modelTest?._id) {
      setSelectedCategory(modelTest?.category?._id);
      setSelectedClass(modelTest?.class?._id);
      setSelectedSubject(modelTest?.subject?._id);
      setSelectedChapter(modelTest?.chapter?._id);
      setSelectedExamType(modelTest?.examType);
      setSelectedNegativeMark(modelTest?.negativeMark);
      setSelectedMcqs(modelTest?.mcqs);
    }
  }, [modelTest]);

  //------------------------Category
  const { data: category } = useGetAcademyCategoriesQuery();
  const categories = category?.data;

  useEffect(() => {
    if (category?.data?.length > 0) setSelectedCategory(category?.data[0]?._id);
  }, [category?.data]);

  //------------------------Classes
  let query = {};
  query["category"] = selectedCategory;
  const { data: cls } = useGetAcademyClassesQuery({ ...query });
  const classes = cls?.data;

  useEffect(() => {
    setSelectedClass(cls?.data[0]?._id);
  }, [cls?.data]);

  //---------------------Subject
  let subjectQuery = {};
  subjectQuery["category"] = selectedCategory;
  subjectQuery["cls"] = selectedClass;
  const { data: subject } = useGetAcademySubjectsQuery({ ...subjectQuery });
  const subjects = subject?.data;

  useEffect(() => {
    setSelectedSubject(subject?.data[0]?._id);
  }, [subject]);

  //---------------------chapter
  let chapterQuery = {};
  chapterQuery["category"] = selectedCategory;
  chapterQuery["cls"] = selectedClass;
  chapterQuery["subject"] = selectedSubject;
  const { data: chapter } = useGetAcademyChaptersQuery({ ...chapterQuery });
  const chapters = chapter?.data;

  let mcqQuery = {};
  mcqQuery["subject"] = selectedSubject;
  mcqQuery["chapter"] = selectedChapter;
  const { data: mcq } = useGetAcademyMCQQuery({ ...mcqQuery });

  const handleOnchange = (value) => {
    if (value > mcq?.data?.length) {
      return setError(`${value} mcq not found!`);
    } else {
      setError("");
    }

    let mcqs = mcq?.data;
    let copiedArray = [...mcqs];
    for (let i = copiedArray?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }

    const randomMcq = copiedArray.slice(0, value);

    setSelectedMcqs(randomMcq?.map((item) => item?._id));
  };

  //------------------Handle edit model test
  const [updateModelTest, { isLoading }] = useUpdateModelTestMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    let form = e.target;
    let category = form.category.value;
    let cls = form.class.value;
    let subject = form.subject.value;
    let chapter = form.chapter.value;
    let examType = form.examType.value;
    let name = form.name.value;
    let totalMark = form.totalMark.value;
    let negativeMark = form.negativeMark.value;
    let passMark = form.passMark.value;
    let duration = form.duration.value;

    let info = {
      mainCategory: selectedMainCategory,
      category,
      categoryType: "AcademyCategory",
      subCategory: cls,
      subCategoryType: "Class",
      subject,
      chapter,
      examType,
      name,
      mcqs: selectedMcqs,
      totalMark,
      negativeMark,
      passMark,
      duration,
    };

    const res = await updateModelTest({ id, info });

    if (res?.data?.success) {
      toast.success("Exam Model Test edit Success");
      navigate(`/admin/modeltest/all`);
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleEdit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="mb-1">Category Name</p>
            <select
              name="category"
              required
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
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
              value={selectedClass}
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
              value={selectedSubject}
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
              onChange={(e) => setSelectedChapter(e.target.value)}
              value={selectedChapter}
            >
              <option value="">select Chapter</option>
              {chapters?.map((chapter) => (
                <option key={chapter?._id} value={chapter?._id}>
                  {chapter?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className="mb-1">Name</p>
          <input
            type="text"
            name="name"
            required
            defaultValue={modelTest?.name}
          />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p>Exam type</p>
            <select
              name="examType"
              required
              onChange={(e) => setSelectedExamType(e.target.value)}
              value={selectedExamType}
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div>
            <p>
              Total Question:{" "}
              <small className="text-neutral-content">
                available question {mcq?.data?.length}
              </small>
            </p>
            <input
              onChange={(e) => handleOnchange(e.target.value)}
              type="number"
              name="totalQuestion"
              required
              defaultValue={modelTest?.mcqs?.length}
            />

            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <div>
            <p>Total Mark:</p>
            <input
              type="number"
              name="totalMark"
              required
              defaultValue={modelTest?.totalMark}
            />
          </div>

          <div>
            <p>Pass Mark:</p>
            <input
              type="number"
              name="passMark"
              required
              defaultValue={modelTest?.passMark}
            />
          </div>

          <div>
            <p>Negative Mark:</p>
            <select
              name="negativeMark"
              value={selectedNegativeMark}
              required
              onChange={(e) => setSelectedNegativeMark(e.target.value)}
            >
              <option value="0.00">0.00</option>
              <option value="0.25">0.25</option>
              <option value="0.50">0.50</option>
              <option value="0.1">0.1</option>
            </select>
          </div>

          <div>
            <p>
              Duration: <small className="text-neutral-content">min.</small>
            </p>
            <input
              type="number"
              name="duration"
              required
              defaultValue={modelTest?.duration}
            />
          </div>
        </div>

        <div className="mt-5">
          <button disabled={isLoading && "disabled"} className="primary_btn">
            {isLoading ? "Loading..." : "Edit Model Test"}
          </button>
        </div>
      </form>
    </div>
  );
}
