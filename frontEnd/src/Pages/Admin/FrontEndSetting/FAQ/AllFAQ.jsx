import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import TableSkeleton from "../../../../Components/Skeleton/TableSkeleton";
import {
  useDeleteFaqMutation,
  useGetFaqQuery,
} from "../../../../Redux/api/FaqApi";

export default function AllFAQ() {
  const { data, isLoading } = useGetFaqQuery();
  let faqs = data?.data;

  const [deleteFaq] = useDeleteFaqMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this faq?");
    if (isConfirm) {
      let res = await deleteFaq(id);
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
          <h2 className="text-lg font-medium">All FAQ</h2>
          <Link to="/admin/front-end/faq/add" className="primary_btn text-sm">
            Add New
          </Link>
        </div>

        <div className="relative overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Sl</th>
                <th>Question</th>
                <th>Ans</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {faqs?.map((faq, i) => (
                <tr key={faq?._id}>
                  <td>{i + 1}</td>
                  <td>{faq?.question}</td>
                  <td>
                    {faq?.ans?.length > 50
                      ? faq?.ans.slice(0, 50) + "..."
                      : faq?.ans}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/front-end/faq/edit/${faq?._id}`}
                        className="text-blue-600"
                      >
                        <AiOutlineEdit className="hover:text-green-500 text-xl duration-200" />
                      </Link>
                      <button onClick={() => handleDelete(faq?._id)}>
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
