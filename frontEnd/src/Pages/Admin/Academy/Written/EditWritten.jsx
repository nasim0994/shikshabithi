import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { useGetAcademyCategoriesQuery } from "../../../../Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "../../../../Redux/api/academy/classApi";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetAcademyChaptersQuery } from "../../../../Redux/api/academy/chapterApi";
import {
  useGetSingleAcademyWrittenQuery,
  useUpdateAcademyWrittenMutation,
} from "../../../../Redux/api/academy/writtenApi";

export default function EditWritten() {
  const { id } = useParams();
  const { data } = useGetSingleAcademyWrittenQuery(id);
  const mcq = data?.data;

  const editor = useRef(null);
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [ans, setAns] = useState("");
  const [explain, setExplain] = useState("");

  //------------------------Category
  const { data: category } = useGetAcademyCategoriesQuery();
  const categories = category?.data;
  const [selectedCategory, setSelectedCategory] = useState("");

  //------------------------Classes
  const { data: cls } = useGetAcademyClassesQuery(selectedCategory);
  const classes = cls?.data;
  const [selectedClass, setSelectedClass] = useState("");

  //---------------------Subject
  const { data: subject } = useGetAcademySubjectsQuery(selectedClass);
  const subjects = subject?.data;
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    setQuestion(mcq?.question);
    setAns(mcq?.ans);
    setExplain(mcq?.explain);

    setSelectedCategory(mcq?.category);
    setSelectedClass(mcq?.class);
    setSelectedSubject(mcq?.subject);
  }, [mcq]);

  //---------------------Chapter
  const { data: chapter } = useGetAcademyChaptersQuery(selectedSubject);
  const chapters = chapter?.data;

  const [updateAcademyWritten, { isLoading }] =
    useUpdateAcademyWrittenMutation();

  const handleEdit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const category = form.category.value;
    const cls = form.class.value;
    const subject = form.subject.value;
    const chapter = form.chapter.value;
    const videoLink = form.videoLink.value;

    const info = {
      category,
      class: cls,
      subject,
      chapter,
      question,
      ans,
      videoLink,
      explain,
    };

    const res = await updateAcademyWritten({ id, info });

    if (res?.data?.success) {
      Swal.fire("", "MCQ edit success", "success");
      navigate("/admin/academy/mcq");
    } else {
      Swal.fire("", "something went wront!", "error");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Edit Written</h2>

        <form onSubmit={handleEdit} className="p-4">
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
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
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
              <select name="chapter" required defaultValue={mcq?.chapter}>
                {chapters?.map((chapter) => (
                  <option key={chapter?._id} value={chapter?._id}>
                    {chapter?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-1">Question</p>
            <JoditEditor
              ref={editor}
              value={question}
              onBlur={(text) => setQuestion(text)}
            />
          </div>

          {/* ans */}
          <div className="mt-4 border rounded p-3">
            <div>
              <p className="mb-1">Ans</p>
              <JoditEditor
                ref={editor}
                value={ans}
                onBlur={(text) => setAns(text)}
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-1">
              Video Link
              <span className="text-neutral-content">(optional)</span>
            </p>
            <input type="text" name="videoLink" defaultValue={mcq?.videoLink} />
          </div>

          <div className=" mt-4">
            <p className="mb-1">ব্যাখ্যা</p>
            <JoditEditor
              ref={editor}
              value={explain}
              onBlur={(text) => setExplain(text)}
            />
          </div>

          <div className="mt-2">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Update Written"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
