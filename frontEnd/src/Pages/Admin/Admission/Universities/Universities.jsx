import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  useDeleteAdmissionUniversityMutation,
  useGetAdmissionUniversitiesQuery,
} from "../../../../Redux/api/admission/universityApi";
import Spinner from "../../../../Components/Loader/Spinner/Spinner";
import { toast } from "react-toastify";

export default function Universities() {
  const { data, isLoading } = useGetAdmissionUniversitiesQuery();
  const universities = data?.data;

  const [deleteAdmissionUniversity] = useDeleteAdmissionUniversityMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this University?");
    if (isConfirm) {
      const res = await deleteAdmissionUniversity(id);
      if (res?.data?.success) {
        toast.success("University delete success");
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
        <h3>Universities</h3>
        <Link to="/admin/admission/universities/add" className="secondary_btn">
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>University Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {universities?.map((university) => (
              <tr key={university?._id}>
                <td>{university?.name}</td>
                <td>
                  <div className="flex items-center gap-2 text-lg">
                    <Link
                      to={`/admin/admission/universities/edit/${university?._id}`}
                      className="hover:text-primary"
                    >
                      <FaRegEdit />
                    </Link>

                    <button
                      onClick={() => handleDelete(university?._id)}
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
