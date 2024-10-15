import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleAcademyChapterQuery,
  useUpdateAcademyChapterMutation,
} from "../../../../Redux/api/academy/chapterApi";
import Swal from "sweetalert2";

export default function EditChapter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetSingleAcademyChapterQuery(id);
  const chapter = data?.data;

  const [updateAcademyChapter, { isLoading }] =
    useUpdateAcademyChapterMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const order = e.target.order.value;
    const category = e.target.category.value;
    const clas = e.target.class.value;
    const subject = e.target.subject.value;

    const info = {
      name,
      order,
      category,
      class: clas,
      subject,
    };

    const res = await updateAcademyChapter({ id, info });
    if (res?.data?.success) {
      Swal.fire("", "Chapter update success", "success");
      navigate("/admin/academy/chapters");
    } else {
      Swal.fire("", "Something went wront!", "error");
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Edit Chapter</h2>

        <form onSubmit={handleUpdate} className="p-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <p className="mb-1">Chapter Name</p>
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

          <div className="mt-4 grid sm:grid-cols-3 gap-4">
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
          </div>

          <div className="mt-2">
            <button className="primary_btn">
              {isLoading ? "Loading..." : "Edit Chapter"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
