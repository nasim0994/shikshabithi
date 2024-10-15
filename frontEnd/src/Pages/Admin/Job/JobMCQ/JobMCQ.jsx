import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteJobMcqMutation,
  useGetJobAllMcqQuery,
} from "../../../../Redux/api/job/jobMcqApi";

export default function JobMCQ() {
  const { data } = useGetJobAllMcqQuery();
  const jobMcqs = data?.data;

  const [deleteJobMcq] = useDeleteJobMcqMutation();

  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this mcq?");
    if (isConfirm) {
      let res = await deleteJobMcq(id);
      if (res?.data?.success) {
        toast.success("Job MCQ delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="flex justify-between items-center p-3">
        <h3 className="font-medium">Job MCQ</h3>
        <Link to="/admin/job/mcq/add" className="primary_btn text-sm">
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
              <th>Institute</th>
              <th>Question Set</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobMcqs?.length > 0 ? (
              jobMcqs?.map((mcq, i) => (
                <tr key={mcq?._id}>
                  <td>{i + 1}</td>
                  <td>{mcq?.subjects?.length}</td>
                  <td>
                    {mcq.subjects?.reduce(
                      (sum, item) => sum + item.mcqs.length,
                      0
                    )}
                  </td>
                  <td>{mcq?.institute?.name}</td>
                  <td>{mcq?.questionSet?.name}</td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
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
