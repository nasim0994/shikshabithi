import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetSingleBoardQuery, useUpdateBoardMutation } from "../../../../Redux/api/board/boardApi";

export default function EditBoard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleBoardQuery(id);
  const [updateBoard, { isLoading }] = useUpdateBoardMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const info = { name };

    const res = await updateBoard({ id, info });
    if (res?.data?.success) {
      toast.success("Board update success");
      navigate("/admin/board-exam/board");
    } else {
      toast.error("something went wrong!");
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3>Edit Board</h3>
      </div>
      <div className="p-4">
        <form onSubmit={handleEdit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5">Board Name</p>
              <input type="text" name="name" defaultValue={data?.data?.name} />
            </div>
          </div>

          <div className="mt-4">
            <button
              disabled={isLoading && "disabled"}
              className="primary_btn text-sm"
            >
              {isLoading ? "Loading..." : "Update Board"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
