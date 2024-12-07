import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import { useAddBlogMutation } from "../../../Redux/api/blogsApi.js";
import { toast } from "react-toastify";
import { useGetAcademySubjectsQuery } from "../../../Redux/api/academy/subjectApi";
import { useGetAcademyChaptersQuery } from "../../../Redux/api/academy/chapterApi";
import { useSelector } from "react-redux";
import { useGetTagsQuery } from "../../../Redux/api/tagApi.js";
import Select from "react-dropdown-select";

export default function AddBlogPage() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const { loggedUser } = useSelector((store) => store.user);
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  let subjectQuery = {};
  if (selectedCategory == "admission") subjectQuery["classuuid"] = 200;
  const { data: subjectData } = useGetAcademySubjectsQuery({ ...subjectQuery });

  //-------------------tags
  const [selectedTags, setSelectedTags] = useState([]);
  const { data: tag } = useGetTagsQuery({});
  let tags = tag?.data;

  useEffect(() => {
    if (subjectData?.data?.length > 0) {
      setSelectedSubject(subjectData?.data[0]?._id);
    }
  }, [subjectData]);

  let chapterQuery = {};
  chapterQuery["subject"] = selectedSubject;
  const { data: chapterData } = useGetAcademyChaptersQuery({ ...chapterQuery });

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    },
  };

  const [addBlog, { isLoading }] = useAddBlogMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const subject = form.subject ? form.subject.value : "";
    const chapter = form.chapter ? form.chapter.value : "";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("details", details);
    formData.append("user", loggedUser?.data?._id);
    formData.append(
      "tags",
      JSON.stringify(selectedTags?.map((tag) => tag?._id))
    );

    if (selectedCategory !== "others") {
      formData.append("subject", subject);
      formData.append("chapter", chapter);
    }

    if (images?.length > 0) formData.append("image", images[0]?.file);

    let res = await addBlog(formData);

    if (res?.data?.success) {
      toast.success("Blog add success");
      navigate(`/blogs/${category}`);
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="bg-base-100 shadow rounded p-6">
          <div className="text-center">
            <h3 className="text-neutral text-xl">Create Blog</h3>
            <p className="text-neutral-content text-xs">
              Fill up the form and submit
            </p>
          </div>

          <form
            onSubmit={handleAdd}
            className="py-4 text-neutral flex flex-col gap-4"
          >
            <div>
              <p className="text-xs font-semibold mb-1">
                Blog Title <sup className="text-red-500">*</sup>
              </p>
              <input type="text" name="title" required />
            </div>

            <div className="jodit_200">
              <p className="text-xs font-semibold mb-1">Blog Content</p>
              <JoditEditor
                ref={editor}
                value={details}
                onBlur={(text) => setDetails(text)}
                config={config}
              />
            </div>

            <div>
              <p className="text-xs font-semibold mb-1">Image</p>
              <ImageUploading
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

                    <div className={`${images?.length > 0 && "mt-4"} `}>
                      {images?.map((img, index) => (
                        <div key={index} className="image-item relative">
                          <img src={img["data_url"]} alt="" className="w-40" />
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
                      {subjectData?.data?.map((subject) => (
                        <option key={subject?._id} value={subject?._id}>
                          {subject?.name} - ({subject?.class?.name})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-1">Chapter</p>
                    <select name="chapter">
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
                to="/blogs/academy"
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
      </div>
    </section>
  );
}
