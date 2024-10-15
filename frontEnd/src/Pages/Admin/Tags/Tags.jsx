import { Link } from "react-router-dom";
import TableSkeleton from "../../../Components/Skeleton/TableSkeleton";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  useDeleteTagMutation,
  useGetTagsQuery,
} from "../../../Redux/api/tagApi";

export default function Tags() {
  const { data, isLoading } = useGetTagsQuery();
  const tags = data?.data;

  const [deleteTag] = useDeleteTagMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this tag?");
    if (isConfirm) {
      let res = await deleteTag(id);
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
          <h3 className="text-lg font-medium">All Tags</h3>
          <Link to="/admin/tags/add" className="primary_btn text-sm">
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
              {tags?.map((item, i) => (
                <tr key={item?._id}>
                  <td>{i + 1}</td>
                  <td>{item?.name}</td>
                  <td>
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/tags/edit/${item?._id}`}
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
