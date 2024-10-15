import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { toast } from "react-toastify";

import {
  useDeleteNoticeMutation,
  useGetNoticesQuery,
  useToggleNoticeStatusMutation,
} from "../../../../Redux/api/noticeApi";
import { useEffect, useState } from "react";
import Pagination from "../../../../Components/Pagination/Pagination";

export default function AllNotice() {
  let [currentPage, setCurrentPage] = useState(1);
  let limit = 10;
  let query = {};
  query["limit"] = limit;
  query["page"] = currentPage;
  const { data, isLoading } = useGetNoticesQuery({ ...query });
  let notices = data?.data;

  let [targetedNotice, setTargetedNotice] = useState([]);
  let [active, setActive] = useState(0);

  const pendingNotice = notices?.filter((notice) => notice?.status == "pending");
  const activeNotice = notices?.filter((notice) => notice?.status == "active");

  useEffect(() => {
    if (active == 0) {
      setTargetedNotice(notices);
    } else if (active == 2) {
      setTargetedNotice(pendingNotice);
    } else if (active == 1) {
      setTargetedNotice(activeNotice);
    }
  }, [notices, activeNotice, active, pendingNotice]);

  const [deleteNotice] = useDeleteNoticeMutation();
  const [toggleNotice] = useToggleNoticeStatusMutation();

  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this Notice?");
    if (isConfirm) {
      let res = await deleteNotice(id);
      if (res?.data?.success) {
        toast.success("Notice delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };
  let handleActive = async (id) => {
    let isConfirm = window.confirm("are you sure change the status?");
    if (isConfirm) {
      let res = await toggleNotice({ id });
      if (res?.data?.success) {
        toast.success("Status change success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="bg-base-100 p-4 rounded shadow flex gap-2 text-sm">
        <button
          onClick={() => setActive(0)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 0 && "text-white bg-primary"
          }`}
        >
          All Notice
        </button>
        <button
          onClick={() => setActive(1)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 1 && "text-white bg-primary"
          }`}
        >
          Active Notice
        </button>
        <button
          onClick={() => setActive(2)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 2 && "text-white bg-primary"
          }`}
        >
          Pending Notice
        </button>
      </div>

      <div className="flex justify-between items-center p-3">
        {active === 0 ? (
          <h3>All Notice</h3>
        ) : active === 0 ? (
          <h3>Active Notice</h3>
        ) : (
          <h3>Pending Notice</h3>
        )}
      </div>

      <div className="relative overflow-x-auto shadow bg-base-100 rounded">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Image</th>
              <th className="text-center">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {targetedNotice?.length > 0 ? (
              targetedNotice?.map((notice, i) => (
                <tr key={notice?._id}>
                  <td>{i + 1}</td>
                  <td>{notice?.title}</td>
                  <td>
                    <img
                      className="w-12 rounded-sm"
                      src={`${
                        notice?.image
                          ? `${import.meta.env.VITE_API_URL}/notice/${
                              notice.image
                            }`
                          : "/images/defaultimg.png"
                      }`}
                      alt="Notice Image"
                    />
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleActive(notice?._id)}
                      className={
                        notice?.status == "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {notice?.status}
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <Link
                        to={`/admin/others/view-notice/${notice?._id}`}
                        className="hover:text-primary"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() => handleDelete(notice?._id)}
                        className="hover:text-red-500"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p className="p-3 text-sm text-red-500">No Data Found!</p>
            )}
          </tbody>
        </table>
      </div>

      {notices?.length >= limit && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
