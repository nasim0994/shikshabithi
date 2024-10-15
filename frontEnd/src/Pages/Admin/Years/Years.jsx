import { Link } from "react-router-dom";
import TableSkeleton from "../../../Components/Skeleton/TableSkeleton";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDeleteYearMutation, useGetYearsQuery } from "../../../Redux/api/yearApi.js";

export default function Years() {
  const { data, isLoading } = useGetYearsQuery();
  const years = data?.data;

  const [deleteYear] = useDeleteYearMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this year?");
    if (isConfirm) {
      let res = await deleteYear(id);
      if (res?.data?.success) {
        toast.success("delete success");
      } else {
        toast.error("something went wrong!");
        console.log(res);
      }
    }
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <div className="flex justify-between items-center border-b p-2">
          <h3 className="text-lg font-medium">All Years</h3>
          <Link to="/admin/years/add" className="primary_btn text-sm">
            Add New
          </Link>
        </div>

        <div className="relative overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Sl</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {years?.map((item, i) => (
                <tr key={item?._id}>
                  <td>{i + 1}</td>
                  <td>{item?.year}</td>
                  <td>
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/years/edit/${item?._id}`}
                        className="font-medium text-blue-600 hover:text-primary duration-200"
                      >
                        Edit
                      </Link>

                      <button onClick={() => handleDelete(item?._id)}>
                        <AiOutlineDelete className="text-lg hover:text-red-500 duration-200" />
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
