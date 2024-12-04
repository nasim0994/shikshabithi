import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import TableSkeleton from "../../../../Components/Skeleton/TableSkeleton";
import {
  useDeleteAdminNoticeMutation,
  useGetAdminNoticeQuery,
  useUpdateAdminNoticeStatusMutation,
} from "../../../../Redux/api/adminNoticeApi";
import { useState } from "react";

export default function AllAdminNotice() {
  const { data, isLoading } = useGetAdminNoticeQuery();
  let notices = data?.data;

  console.log(notices);

  const [deleteAdminNotice] = useDeleteAdminNoticeMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this Notice?");
    if (isConfirm) {
      let res = await deleteAdminNotice(id);
      if (res?.data?.success) {
        toast.success("delete success");
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    }
  };

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [updateAdminNoticeStatus, { isLoading: uIsLoading }] =
    useUpdateAdminNoticeStatusMutation();

  const handleUpdateFeatured = async (id) => {
    setSelectedNotice(id);

    const res = await updateAdminNoticeStatus(id);

    if (res?.data?.success) {
      toast.success("Status updated success");
    } else {
      toast.error(res?.data?.message || "Something went wrong!");
      console.log(res);
    }
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <div className="flex justify-between items-center border-b p-2 ">
          <h3 className="text-lg">All Admin Notice</h3>
          <Link
            to="/admin/front-end/admin-notice/add"
            className="primary_btn text-sm"
          >
            Add New
          </Link>
        </div>

        <div className="relative overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Sl</th>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {notices?.map((notice, i) => (
                <tr key={notice?._id}>
                  <td>{i + 1}</td>
                  <td>{notice?.title}</td>
                  <td>
                    {uIsLoading && selectedNotice === notice?._id ? (
                      <p>Loading...</p>
                    ) : (
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          checked={notice?.isActive || false}
                          type="checkbox"
                          value={notice?.isActive}
                          className="peer sr-only"
                          onChange={() => handleUpdateFeatured(notice?._id)}
                        />
                        <div className="peer h-[23px] w-11 rounded-full bg-gray-200 after:absolute after:start-[1px] after:top-[1.5px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                      </label>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/front-end/admin-notice/edit/${notice?._id}`}
                        className="text-blue-600"
                      >
                        <AiOutlineEdit className="hover:text-green-500 text-xl duration-200" />
                      </Link>
                      <button onClick={() => handleDelete(notice?._id)}>
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
    </section>
  );
}
