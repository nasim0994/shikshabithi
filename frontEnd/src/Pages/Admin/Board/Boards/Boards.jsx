import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Spinner from "../../../../Components/Loader/Spinner/Spinner";
import { toast } from "react-toastify";
import { useDeleteBoardMutation, useGetBoardsQuery } from "../../../../Redux/api/board/boardApi";


export default function Boards() {
  const { data, isLoading } = useGetBoardsQuery();
  const boards = data?.data;

  const [deleteBoard] = useDeleteBoardMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this board?");
    if (isConfirm) {
      const res = await deleteBoard(id);
      if (res?.data?.success) {
        toast.success("Board delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="flex justify-between items-center p-3">
        <h3 className="font-medium">All Boards</h3>
        <Link to="/admin/board-exam/add" className="primary_btn text-sm">
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Board Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {boards?.map((board) => (
              <tr key={board?._id}>
                <td>{board?.name}</td>
                <td>
                  <div className="flex items-center gap-2 text-lg">
                    <Link
                      to={`/admin/board-exam/edit/${board?._id}`}
                      className="hover:text-primary"
                    >
                      <FaRegEdit />
                    </Link>

                    <button
                      onClick={() => handleDelete(board?._id)}
                      className="hover:text-red-500"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
