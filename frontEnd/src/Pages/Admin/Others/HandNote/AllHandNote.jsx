import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { toast } from "react-toastify";

import {
  useDeleteHandNoteMutation,
  useGetHandNotesQuery,
  useToggleHandNoteStatusMutation,
} from "../../../../Redux/api/handnotesApi";
import { useEffect, useState } from "react";
import Pagination from "../../../../Components/Pagination/Pagination";

export default function AllHandNote() {
  let [currentPage, setCurrentPage] = useState(1);
  let limit = 10;
  let query = {};
  query["limit"] = limit;
  query["page"] = currentPage;
  const { data, isLoading } = useGetHandNotesQuery({ ...query });
  let handNotes = data?.data;


  let [targetedHandNotes, setTargetedHandNotes] = useState([]);
  let [active, setActive] = useState(0);

  const pendingHandNotes = handNotes?.filter(
    (handnote) => handnote?.status == "pending"
  );
  const activeHandNotes = handNotes?.filter((handnote) => handnote?.status == "active");

  useEffect(() => {
    if (active == 0) {
      setTargetedHandNotes(handNotes);
    } else if (active == 2) {
      setTargetedHandNotes(pendingHandNotes);
    } else if (active == 1) {
      setTargetedHandNotes(activeHandNotes);
    }
  }, [handNotes, activeHandNotes, active, pendingHandNotes]);

  const [deleteHandnote] = useDeleteHandNoteMutation();
  const [toggleHandNote] = useToggleHandNoteStatusMutation();

  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this Hand Note?");
    if (isConfirm) {
      let res = await deleteHandnote(id);
      if (res?.data?.success) {
        toast.success("Hand Note delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };
  let handleActive = async (id) => {
    let isConfirm = window.confirm("Are you sure change the status?");
    if (isConfirm) {
      let res = await toggleHandNote({ id });
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
          All Hand Note
        </button>
        <button
          onClick={() => setActive(1)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 1 && "text-white bg-primary"
          }`}
        >
          Active Hand Note
        </button>
        <button
          onClick={() => setActive(2)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 2 && "text-white bg-primary"
          }`}
        >
          Pending Hand Note
        </button>
      </div>

      <div className="flex justify-between items-center p-3">
        {active === 0 ? (
          <h3>All Hand Note</h3>
        ) : active === 0 ? (
          <h3>Active HandNotes</h3>
        ) : (
          <h3>Pending HandNotes</h3>
        )}
      </div>

      <div className="relative overflow-x-auto shadow bg-base-100 rounded">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th className="text-center">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {targetedHandNotes?.length > 0 ? (
              targetedHandNotes?.map((handnote, i) => (
                <tr key={handnote?._id}>
                  <td>{i + 1}</td>
                  <td>{handnote?.title}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleActive(handnote?._id)}
                      className={
                        handnote?.status == "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {handnote?.status}
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <Link
                        to={`/admin/others/view-handnote/${handnote?._id}`}
                        className="hover:text-primary"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() => handleDelete(handnote?._id)}
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

      {handNotes?.length >= limit && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
