import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useDeleteJobQuesSetMutation,
  useGetJobQuesSetQuery,
} from "../../../../Redux/api/job/jobQuesSetApi";

export default function JobQuesSet() {
  const { data } = useGetJobQuesSetQuery();
  const questionSets = data?.data;

  const [deleteJobQuesSet] = useDeleteJobQuesSetMutation();
  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this set?");
    if (isConfirm) {
      let res = await deleteJobQuesSet(id);
      if (res?.data?.success) {
        toast.success("Question set delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="flex justify-between items-center p-3">
        <h3 className="font-medium">Question Set</h3>
        <Link to="/admin/job/question-set/add" className="primary_btn text-sm">
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Question Set Name</th>
              <th>Institute</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {questionSets?.length > 0 ? (
              questionSets?.map((set, i) => (
                <tr key={set?._id}>
                  <td>{i + 1}</td>
                  <td>{set?.name}</td>
                  <td>{set?.institute?.name}</td>
                  <td>{set?.year}</td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <Link
                        to={`/admin/job/question-set/edit/${set?._id}`}
                        className="hover:text-primary"
                      >
                        <FaRegEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(set?._id)}
                        className="hover:text-red-500"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p className="p-3 text-sm text-red-500">No Data Found!</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
