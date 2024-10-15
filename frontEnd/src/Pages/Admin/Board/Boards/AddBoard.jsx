import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddBoardMutation } from "../../../../Redux/api/board/boardApi";

export default function AddBoard() {
  const navigate = useNavigate();

  const [addBoard, { isLoading }] = useAddBoardMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const info = {
      name,
    };

    const res = await addBoard(info);
    if (res?.data?.success) {
      toast.success("Board add success");
      navigate("/admin/board-exam/board");
    } else {
      toast.error("something went wrong!");
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium">Add Board</h3>
      </div>
      <div className="p-4">
        <form onSubmit={handleAdd}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5">Board Name</p>
              <input type="text" name="name" />
            </div>
          </div>

          <div className="mt-4">
            <button className="primary_btn" disabled={isLoading && "disabled"}>
              {isLoading ? "Loading..." : "Add Board"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
