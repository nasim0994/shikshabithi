import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import {
  useDeleteModelTestMutation,
  useGetModelTestQuery,
  useUpdateModelTestStatusMutation,
} from "../../../Redux/api/modelTestApi";

export default function AllModelTest() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  let query = {};
  if (category) query.mainCategory = category;
  if (status) query.status = status;

  const { data, isLoading } = useGetModelTestQuery(query);
  let modelTests = data?.data;

  const [updateModelTestStatus, { isLoading: uLoading }] =
    useUpdateModelTestStatusMutation();

  const [deleteModelTest] = useDeleteModelTestMutation();
  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this set?");
    if (isConfirm) {
      let res = await deleteModelTest(id);
      if (res?.data?.success) {
        toast.success("Model test delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  const updateModelTest = async ({ id }) => {
    const isConfirm = window.confirm("Are you sure to update this status?");
    if (!isConfirm) return;

    let res = await updateModelTestStatus(id);
    if (res?.data?.success) {
      toast.success("Model test status updated successfully");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 gap-2">
        <div>
          <h2>All Model Test</h2>

          <div className="flex gap-2 items-start text-xs mt-2">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="sm:w-40"
            >
              <option value="">All</option>
              <option value="academy">Academy</option>
              <option value="admission">Admission</option>
              <option value="job">Job</option>
            </select>

            <select
              onChange={(e) => setStatus(e.target.value)}
              className="sm:w-40"
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <Link to="/admin/modelTest/add" className="primary_btn text-sm w-max">
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Model Test Name</th>
              <th>Total Question</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {modelTests?.length > 0 ? (
              modelTests?.map((modelTest, i) => (
                <tr key={modelTest?._id}>
                  <td>{i + 1}</td>
                  <td>{modelTest?.name}</td>
                  <td>{modelTest?.mcqs?.length}</td>
                  <td
                    className={`${
                      modelTest?.examType == "free"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {uLoading ? "Loading..." : modelTest?.examType}
                  </td>
                  <td
                    className={
                      modelTest?.status == "pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  >
                    <button
                      onClick={() => updateModelTest({ id: modelTest?._id })}
                    >
                      {modelTest?.status}
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <Link
                        to={`/admin/modeltest/edit/${modelTest?._id}`}
                        className="hover:text-primary"
                      >
                        <FaRegEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(modelTest?._id)}
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
    </div>
  );
}
