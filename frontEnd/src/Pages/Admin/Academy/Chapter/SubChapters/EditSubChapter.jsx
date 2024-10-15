import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetSingleAcademySubChapterQuery,
  useUpdateAcademySubChapterMutation,
} from "../../../../../Redux/api/academy/subChapterApi";

export default function EditSubChapter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetSingleAcademySubChapterQuery(id);
  const chapter = data?.data;

  const [updateAcademySubChapter, { isLoading }] =
    useUpdateAcademySubChapterMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const order = e.target.order.value;
    const category = e.target.category.value;
    const clas = e.target.class.value;
    const subject = e.target.subject.value;
    const chapter = e.target.chapter.value;

    const info = {
      name,
      order,
      category,
      class: clas,
      subject,
      chapter,
    };

    const res = await updateAcademySubChapter({ id, info });
    if (res?.data?.success) {
      Swal.fire("", "Chapter update success", "success");
      navigate("/admin/academy/sub-chapters");
    } else {
      Swal.fire("", "Something went wront!", "error");
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Edit Sub Chapter</h2>

        <form onSubmit={handleUpdate} className="p-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <p className="mb-1">Sub Chapter Name</p>
              <input
                type="text"
                name="name"
                required
                defaultValue={chapter?.name}
              />
            </div>
            <div>
              <p className="mb-1">Order</p>
              <input
                type="text"
                name="order"
                required
                defaultValue={chapter?.order}
              />
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-4 gap-4">
            <div>
              <p className="mb-1">Category Name</p>
              <select
                name="category"
                required
                defaultValue={chapter?.category?._id}
                disabled
              >
                <option value={chapter?.category?._id}>
                  {chapter?.category?.name}
                </option>
              </select>
            </div>

            <div>
              <p className="mb-1">Class Name</p>
              <select
                name="class"
                required
                defaultValue={chapter?.class?._id}
                disabled
              >
                <option value={chapter?.class?._id}>
                  {chapter?.class?.name}
                </option>
              </select>
            </div>

            <div>
              <p className="mb-1">Subject Name</p>
              <select
                name="subject"
                required
                defaultValue={chapter?.subject?._id}
                disabled
              >
                <option value={chapter?.subject?._id}>
                  {chapter?.subject?.name}
                </option>
              </select>
            </div>

            <div>
              <p className="mb-1">Chapter Name</p>
              <select
                name="chapter"
                required
                defaultValue={chapter?.chapter?._id}
                disabled
              >
                <option value={chapter?.chapter?._id}>
                  {chapter?.chapter?.name}
                </option>
              </select>
            </div>
          </div>

          <div className="mt-2">
            <button className="primary_btn">
              {isLoading ? "Loading..." : "Edit Sub Chapter"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
