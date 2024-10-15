// import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteAdmissionMcqMutation,
  useGetAdmissionAllMcqQuery,
} from "../../../../Redux/api/admission/admissionMcqApi";

export default function AdmissionMCQ() {
  const { data } = useGetAdmissionAllMcqQuery();
  const admissionMcqs = data?.data;

  const [deleteAdmissionMcq] = useDeleteAdmissionMcqMutation();
  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this set?");
    if (isConfirm) {
      let res = await deleteAdmissionMcq(id);
      if (res?.data?.success) {
        toast.success("Admission MCQ delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="flex justify-between items-center p-3">
        <h2>Question Set</h2>
        <Link to="/admin/admission/mcq/add" className="secondary_btn">
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Total Subject</th>
              <th>Total MCQ</th>
              <th>University</th>
              <th>Question Set</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admissionMcqs?.length > 0 ? (
              admissionMcqs?.map((mcq, i) => (
                <tr key={mcq?._id}>
                  <td>{i + 1}</td>
                  <td>{mcq?.subjects?.length}</td>
                  <td>
                    {mcq.subjects?.reduce(
                      (sum, item) => sum + item.mcqs.length,
                      0
                    )}
                  </td>
                  <td>{mcq?.university?.name}</td>
                  <td>{mcq?.questionSet?.name}</td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      {/* <Link
                        to={`/admin/admission/mcq/edit/${mcq?._id}`}
                        className="hover:text-primary"
                      >
                        <FaRegEdit />
                      </Link> */}

                      <button
                        onClick={() => handleDelete(mcq?._id)}
                        className="hover:text-red-500"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-sm text-red-500">No Data Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
