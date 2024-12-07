import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllUsersOnlyQuery,
  useUpdateUserStatusMutation,
} from "../../../Redux/api/user/userApi";
import Pagination from "../../../Components/Pagination/Pagination";
import TableSkeleton from "../../../Components/Skeleton/TableSkeleton";

export default function Users() {
  const [search, setSearch] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  let limit = 10;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target[0].value);
  };

  let query = {};
  if (search) query.search = search;
  query.limit = limit;
  query.page = currentPage;

  const { data, isLoading, isFetching } = useGetAllUsersOnlyQuery(query);
  const users = data?.data;

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const handleUpdateStatus = async (id) => {
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
          <h2 className="font-semibold">All Users</h2>

          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="search user by email..."
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
              <th>package</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user?._id}>
                <td>{(currentPage - 1) * limit + i + 1}</td>
                <td>
                  <div className="flex items-center gap-2">
                    {user?.profile?.name}
                  </div>
                </td>
                <td>{user?.email}</td>
                <td>
                  <button
                    onClick={() => handleUpdateStatus(user?._id)}
                    className={
                      user?.status == "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {user?.status}
                  </button>
                </td>
                <td>{user?.package?.title || "Gest User"}</td>
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
