import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteBoardMcqMutation,
  useGetBoardMcqsQuery,
} from "../../../../Redux/api/board/boardMcqApi";

export default function BoardMCQ() {
  const { data } = useGetBoardMcqsQuery();
  const boardMcqs = data?.data;

  console.log(data);

  const [deleteBoardMcq] = useDeleteBoardMcqMutation();

  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this mcq?");
    if (isConfirm) {
      let res = await deleteBoardMcq(id);
      if (res?.data?.success) {
        toast.success("Board MCQ delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="flex justify-between items-center p-3">
        <h3 className="font-medium">Board MCQ</h3>
        <Link to="/admin/board-exam/mcq/add" className="primary_btn text-sm">
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Board</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Total MCQ</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {boardMcqs?.length > 0 ? (
              boardMcqs?.map((mcq, i) => (
                <tr key={mcq?._id}>
                  <td>{i + 1}</td>
                  <td>{mcq?.board?.name}</td>
                  <td>{mcq?.class?.name}</td>
                  <td>{mcq?.subject?.name}</td>
                  <td>{mcq?.mcqs?.length}</td>

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
