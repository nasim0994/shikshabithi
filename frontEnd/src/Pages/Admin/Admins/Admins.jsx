import { AiFillEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
} from "../../../Redux/api/user/AdminApi";
import { useSelector } from "react-redux";

export default function Admins() {
  const { loggedUser } = useSelector((state) => state.user);
  const { data } = useGetAllAdminsQuery();
  const admins = data?.data;

  const [deleteAdmin] = useDeleteAdminMutation();
  const handleDelete = async (id) => {
    if (loggedUser?.data?._id === id) {
      return toast.error("You can't delete yourself");
    }
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      const res = await deleteAdmin(id);
      if (res.data.success) {
        toast.success(res.data.message || "Admin deleted successfully");
      } else {
        toast.error(res.data.message || "Failed to delete admin");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="flex justify-end mb-2">
        <Link to="/admin/admins/add" className="primary_btn">
          Add Administrator
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-lg bg-base-100">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin, i) => (
              <tr key={admin?._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-2">
                    {admin?.profile?.name}
                  </div>
                </td>
                <td>{admin?.email}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/admins/edit/${admin?._id}`}>
                      <AiFillEdit className="hover:text-green-500 duration-200" />
                    </Link>
                    <button onClick={() => handleDelete(admin?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500 duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
