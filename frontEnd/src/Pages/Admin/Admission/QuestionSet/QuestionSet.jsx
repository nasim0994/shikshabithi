import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  useDeleteAdmissionQuestionSetMutation,
  useGetAdmissionAllQuestionSetQuery,
} from "../../../../Redux/api/admission/questionSetApi";
import { toast } from "react-toastify";

export default function QuestionSet() {
  const { data } = useGetAdmissionAllQuestionSetQuery();
  const questionSets = data?.data;

  const [deleteAdmissionQuestionSet] = useDeleteAdmissionQuestionSetMutation();
  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this set?");
    if (isConfirm) {
      let res = await deleteAdmissionQuestionSet(id);
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
        <h3>Question Set</h3>
        <Link to="/admin/admission/question-set/add" className="secondary_btn">
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Question Set Name</th>
              <th>University</th>
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
                  <td>{set?.university?.name}</td>
                  <td>{set?.year}</td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <Link
                        to={`/admin/admission/question-set/edit/${set?._id}`}
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
