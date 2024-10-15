import { Link } from "react-router-dom";
import {
  useDeletePackageMutation,
  useGetPackagesQuery,
} from "../../../Redux/api/packageApi";
import TableSkeleton from "../../../Components/Skeleton/TableSkeleton";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Packsges() {
  const { data, isLoading } = useGetPackagesQuery();
  const packages = data?.data;

  const [deletePackage] = useDeletePackageMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this package?");
    if (isConfirm) {
      let res = await deletePackage(id);
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
          <h2 className="text-lg font-medium">All Packages</h2>
          <Link to="/admin/packages/add" className="primary_btn text-sm">
            Add New
          </Link>
        </div>

        <div className="relative overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Sl</th>
                <th>Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {packages?.map((item, i) => (
                <tr key={item?._id}>
                  <td>{i + 1}</td>
                  <td>{item?.title}</td>
                  <td>{item?.price}tk</td>
                  <td>{item?.discount}%</td>
                  <td>{item?.type}</td>
                  <td>
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/packages/edit/${item?._id}`}
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
