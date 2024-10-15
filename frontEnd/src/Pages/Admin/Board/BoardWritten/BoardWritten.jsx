import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteBoardWrittenMutation, useGetBoardWrittensQuery } from "../../../../Redux/api/board/boardWrittenApi";

export default function BoardWritten() {
  const { data } = useGetBoardWrittensQuery();
  const boardWrittens = data?.data;

  console.log(data);

  const [deleteBoardWritten] = useDeleteBoardWrittenMutation();

  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this written?");
    if (isConfirm) {
      let res = await deleteBoardWritten(id);
      if (res?.data?.success) {
        toast.success("Written Written delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="flex justify-between items-center p-3">
        <h3 className="font-medium">Board Written</h3>
        <Link
          to="/admin/board-exam/written/add"
          className="primary_btn text-sm"
        >
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
              <th>Total Written</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {boardWrittens?.length > 0 ? (
              boardWrittens?.map((written, i) => (
                <tr key={written?._id}>
                  <td>{i + 1}</td>
                  <td>{written?.board?.name}</td>
                  <td>{written?.class?.name}</td>
                  <td>{written?.subject?.name}</td>
                  <td>{written?.writtens?.length}</td>

                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <button
                        onClick={() => handleDelete(written?._id)}
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
                <td className="p-3 text-sm text-red-500">No Written Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
