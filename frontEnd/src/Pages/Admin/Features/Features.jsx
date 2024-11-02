import { Link } from "react-router-dom";
import {
  useDeleteFeatureMutation,
  useGetFeatureQuery,
} from "../../../Redux/api/featureApi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import TableSkeleton from "../../../Components/Skeleton/TableSkeleton";

export default function Features() {
  const { data, isLoading } = useGetFeatureQuery();
  let features = data?.data;

  const [deleteFeature] = useDeleteFeatureMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this feature?");
    if (isConfirm) {
      let res = await deleteFeature(id);
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
        <div className="flex justify-between items-center border-b p-2 ">
          <h2 className="text-lg font-medium">All Features</h2>
          <Link to="/admin/features/add" className="primary_btn text-sm">
            Add New
          </Link>
        </div>

        <div className="relative overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Sl</th>
                <th>Icon</th>
                <th>Title</th>
                <th>Sub Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {features?.map((feature, i) => (
                <tr key={feature?._id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/feature/${
                        feature?.icon
                      }`}
                      alt=""
                      className="w-8 h-8"
                      loading="lazy"
                    />
                  </td>
                  <td>{feature?.title}</td>
                  <td>{feature?.subTitle}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/features/edit/${feature?._id}`}
                        className="text-blue-600"
                      >
                        <AiOutlineEdit className="hover:text-green-500 text-xl duration-200" />
                      </Link>
                      <button onClick={() => handleDelete(feature?._id)}>
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
