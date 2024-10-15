import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Spinner from "../../../../Components/Loader/Spinner/Spinner";
import { toast } from "react-toastify";
import {
  useDeleteInstituteMutation,
  useGetInstitutesQuery,
} from "../../../../Redux/api/job/instituteApi";

export default function Institutes() {
  const { data, isLoading } = useGetInstitutesQuery();
  const institutes = data?.data;

  const [deleteInstitute] = useDeleteInstituteMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this institute?");
    if (isConfirm) {
      const res = await deleteInstitute(id);
      if (res?.data?.success) {
        toast.success("institute delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="bg-base-100 shadow rounded">
      <div className="flex justify-between items-center p-3">
        <h3 className="font-medium">All Institutes</h3>
        <Link to="/admin/job/institutes/add" className="primary_btn text-sm">
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Institute Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {institutes?.map((institute) => (
              <tr key={institute?._id}>
                <td>{institute?.name}</td>
                <td>
                  <div className="flex items-center gap-2 text-lg">
                    <Link
                      to={`/admin/job/institutes/edit/${institute?._id}`}
                      className="hover:text-primary"
                    >
                      <FaRegEdit />
                    </Link>

                    <button
                      onClick={() => handleDelete(institute?._id)}
                      className="hover:text-red-500"
                    >
                      <MdDelete className="text-xl" />
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
