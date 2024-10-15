import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleAcademySubjectQuery,
  useUpdateAcademySubjectMutation,
} from "../../../../Redux/api/academy/subjectApi";
import Swal from "sweetalert2";

export default function EditSubject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetSingleAcademySubjectQuery(id);
  const subject = data?.data;

  const [updateAcademySubject, { isLoading }] =
    useUpdateAcademySubjectMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const order = e.target.order.value;
    const category = e.target.category.value;
    const clas = e.target.class.value;

    const info = {
      name,
      order,
      category,
      class: clas,
    };

    const res = await updateAcademySubject({ id, info });
    if (res?.data?.success) {
      Swal.fire("", "Subject update success", "success");
      navigate("/admin/academy/subjects");
    } else {
      Swal.fire("", "Something went wront!", "error");
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Edit Subject</h2>

        <form onSubmit={handleUpdate} className="p-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <p className="mb-1">Subject Name</p>
              <input
                type="text"
                name="name"
                required
                defaultValue={subject?.name}
              />
            </div>
            <div>
              <p className="mb-1">Order</p>
              <input
                type="text"
                name="order"
                required
                defaultValue={subject?.order}
              />
            </div>

            <div>
              <p className="mb-1">Category Name</p>
              <select
                name="category"
                required
                defaultValue={subject?.category?._id}
                disabled
              >
                <option
                  className="bg-primary text-base-100"
                  value={subject?.category?._id}
                >
                  {subject?.category?.name}
                </option>
              </select>
            </div>

            <div>
              <p className="mb-1">Class Name</p>
              <select
                disabled
                name="class"
                required
                defaultValue={subject?.class?._id}
              >
                <option
                  className="bg-primary text-base-100"
                  value={subject?.class?._id}
                >
                  {subject?.class?.name}
                </option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button className="primary_btn">
              {isLoading ? "Loading..." : "Edit Subject"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
