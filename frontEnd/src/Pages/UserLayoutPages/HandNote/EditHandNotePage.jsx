import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetAcademySubjectsQuery } from "../../../Redux/api/academy/subjectApi";
import { useGetAcademyChaptersQuery } from "../../../Redux/api/academy/chapterApi";
import {
  useGetHandNoteQuery,
  useUpdateHandNoteMutation,
} from "../../../Redux/api/handnotesApi";
import { useGetTagsQuery } from "../../../Redux/api/tagApi";
import Select from "react-dropdown-select";

export default function EditHandNotePage() {
  const navigate = useNavigate();
  const { loggedUser } = useSelector((store) => store.user);
  const [images, setImages] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  const { id } = useParams();
  const { data } = useGetHandNoteQuery(id);
  const handnote = data?.data;

  //-------------------tags
  const [selectedTags, setSelectedTags] = useState([]);
  const { data: tag } = useGetTagsQuery({});
  let tags = tag?.data;

  useEffect(() => {
    if (data?.success) {
      setSelectedCategory(data?.data?.category);
      setSelectedSubject(data?.data?.subject?._id);
      setSelectedChapter(data?.data?.chapter?._id);
      setSelectedTags(data?.data?.tags);
    }
  }, [data]);

  let subjectQuery = {};
  if (selectedCategory == "admission") subjectQuery["classuuid"] = 200;
  const { data: subjectData } = useGetAcademySubjectsQuery({ ...subjectQuery });

  let chapterQuery = {};
  chapterQuery["subject"] = selectedSubject;
  const { data: chapterData } = useGetAcademyChaptersQuery({ ...chapterQuery });

  const [updateHandNote, { isLoading }] = useUpdateHandNoteMutation();

  const handleEdit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const subject = form.subject ? form.subject.value : "";
    const chapter = form.chapter ? form.chapter.value : "";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("user", loggedUser?.data?._id);

    if (selectedCategory !== "others") {
      formData.append("subject", subject);
      formData.append("chapter", chapter);
    }
    if (images?.length > 0)
      images?.map((image) => {
        formData.append("images", image?.file);
      });

    formData.append(
      "tags",
      JSON.stringify(selectedTags?.map((tag) => tag?._id))
    );

    let res = await updateHandNote({ id, formData });

    if (res?.data?.success) {
      toast.success("Handnote edit success");
      navigate(`/handnotes?avtive=${selectedCategory}`);
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <div className="bg-base-100 shadow rounded p-6">
      <div className="text-center">
        <h3 className="text-neutral text-xl">Edit Ask Question</h3>
        <p className="text-neutral-content text-xs">
          Fill up the form and submit
        </p>
      </div>

      <form
        onSubmit={handleEdit}
        className="py-4 text-neutral flex flex-col gap-4"
      >
        <div>
          <p className="text-xs font-semibold mb-1">
            Question <sup className="text-red-500">*</sup>
          </p>
          <input
            type="text"
            name="title"
            defaultValue={handnote?.title}
            required
          />
        </div>

        <div className="jodit_200">
          <p className="text-xs font-semibold mb-1">Question Details</p>
          <textarea
            name="description"
            defaultValue={handnote?.description}
          ></textarea>
        </div>

        <div>
          <p className="text-xs font-semibold mb-1">Image</p>
          <div className="grid grid-cols-2 gap-4">
            <ImageUploading
              multiple
              value={images}
              onChange={(icn) => setImages(icn)}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <div
                  className="mt-2 border rounded border-dashed p-4"
                  {...dragProps}
                >
                  <div className="flex items-center gap-2">
                    <span
                      onClick={onImageUpload}
                      className="w-max px-4 py-1.5 rounded-2xl text-base-100 bg-primary cursor-pointer text-sm"
                    >
                      Choose Image
                    </span>

                    <p className="text-neutral-content">or Drop here</p>
                  </div>

                  <div
                    className={`${images?.length > 0 && "mt-4 flex gap-4"} `}
                  >
                    {images?.map((img, index) => (
                      <div key={index} className="image-item relative">
                        <img
                          src={img["data_url"]}
                          alt=""
                          className="w-32 h-16"
                        />
                        <div
                          onClick={() => onImageRemove(index)}
                          className="w-7 h-7 bg-primary rounded-full flex justify-center items-center text-base-100 absolute top-0 right-0 cursor-pointer"
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>

            <div className="flex gap-4">
              {handnote?.images?.map((image) => (
                <img
                  key={image?._id}
                  src={`${import.meta.env.VITE_BACKEND_URL}/handnotes/${image}`}
                  alt=""
                  className="w-full h-32 border rounded mt-2"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold mb-1">Main Category</p>
            <select
              name="category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="academy">Academy</option>
              <option value="admission">Admission</option>
              <option value="job">Job</option>
              <option value="others">Others</option>
            </select>
          </div>

          {selectedCategory !== "others" && (
            <>
              <div>
                <p className="text-xs font-semibold mb-1">Subject</p>
                <select
                  name="subject"
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  value={selectedSubject}
                >
                  {subjectData?.data?.map((s) => (
                    <option key={s?._id} value={s?._id}>
                      {s?.name} - ({s?.class?.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-xs font-semibold mb-1">Chapter</p>
                <select
                  name="chapter"
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  value={selectedChapter}
                >
                  <option value="">Select Chapter</option>
                  {chapterData?.data?.map((chapter) => (
                    <option key={chapter?._id} value={chapter?._id}>
                      {chapter?.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <p className="text-xs font-semibold mb-1">Tags</p>
            <Select
              multi
              options={tags}
              labelField="name"
              valueField="name"
              values={selectedTags}
              onChange={(values) => setSelectedTags(values)}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3 text-sm justify-center">
          <Link
            to="/handnotes"
            className="px-4 py-1.5 rounded bg-gray-200 cursor-pointer"
          >
            Cancel
          </Link>

          <button className="primary_btn">
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
