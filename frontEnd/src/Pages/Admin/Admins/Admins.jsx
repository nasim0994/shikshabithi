import { AiFillEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
} from "../../../Redux/api/user/adminApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import TableSkeleton from "../../../Components/Skeleton/TableSkeleton";
import Pagination from "../../../Components/Pagination/Pagination";
import { useUpdateUserStatusMutation } from "../../../Redux/api/user/userApi";

export default function Admins() {
  const [search, setSearch] = useState("");
  let [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  let query = {};
  if (search) query.search = search;
  query.limit = 10;
  query.page = currentPage;

  const { loggedUser } = useSelector((state) => state.user);
  const { data, isLoading, isFetching } = useGetAllAdminsQuery(query);
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

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const handleUpdateStatus = async (id) => {
    if (loggedUser?.data?._id === id) {
      return toast.error("You can't update your own status");
    }

    const isConfirm = window.confirm("Are you sure update status?");
    if (!isConfirm) return;

    try {
      const res = await updateUserStatus(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Status updated successfully");
      } else {
        toast.error(res?.data?.message || "Status update failed");
        console.log(res);
      }
    } catch (error) {
      toast.error(error?.message || "Status update failed");
      console.log(error);
    }
  };

  if (isLoading || isFetching) return <TableSkeleton />;

  return (
    <section>
      <div className="shadow-lg bg-base-100 p-3 rounded mb-2">
        <div className="flex justify-between items-center">
          <Link to="/admin/admins/add" className="primary_btn text-sm">
            Add Administrator
          </Link>

          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <input
              type="text"
              name="search"
              placeholder="search admin by email..."
              className="px-3 text-sm py-1.2"
              defaultValue={search}
            />
          </form>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-lg bg-base-100">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
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
                  <button
                    onClick={() => handleUpdateStatus(admin?._id)}
                    className={
                      admin?.status == "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {admin?.status}
                  </button>
                </td>
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

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}
