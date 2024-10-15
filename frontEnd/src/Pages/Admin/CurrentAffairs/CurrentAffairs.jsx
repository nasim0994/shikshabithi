import { Link } from "react-router-dom";
import {
  useDeleteCurrentAffairMutation,
  useGetCurrentAffairsQuery,
} from "../../../Redux/api/currentAffairsApi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";

export default function CurrentAffairs() {
  const { data } = useGetCurrentAffairsQuery();
  let currentAffairs = data?.data;

  const [deleteCurrentAffair] = useDeleteCurrentAffairMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this feature?");
    if (isConfirm) {
      let res = await deleteCurrentAffair(id);
      if (res?.data?.success) {
        toast.success("delete success");
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="border-b p-3 flex justify-between items-center">
        <h3>Current Affairs</h3>

        <Link to="/admin/current-affairs/add" className="primary_btn text-sm">
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Category</th>
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAffairs?.map((ca, i) => (
              <tr key={ca?._id}>
                <td>{i + 1}</td>
                <td>
                  {ca?.category == "1"
                    ? "Bangladesg"
                    : ca?.category == "2"
                    ? "International"
                    : "Bangladesh & International"}
                </td>
                <td>{ca?.question}</td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/current-affairs/edit/${ca?._id}`}
                      className="text-blue-600"
                    >
                      <AiOutlineEdit className="hover:text-green-500 text-xl duration-200" />
                    </Link>
                    <button onClick={() => handleDelete(ca?._id)}>
                      <AiOutlineDelete className="hover:text-red-500 text-lg duration-200" />
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
