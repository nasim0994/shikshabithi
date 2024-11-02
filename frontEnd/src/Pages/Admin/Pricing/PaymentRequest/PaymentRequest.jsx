import { toast } from "react-toastify";
import TableSkeleton from "../../../../Components/Skeleton/TableSkeleton";
import {
  useDeletePaymentRequestMutation,
  useGetPaymentRequestQuery,
  useUpdatePaymentRequestStatusMutation,
} from "../../../../Redux/api/paymentRequestApi";
import { AiOutlineDelete } from "react-icons/ai";

export default function PaymentRequest() {
  const { data, isLoading } = useGetPaymentRequestQuery();
  const packages = data?.data;

  const [deletePackage] = useDeletePaymentRequestMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this request?");
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

  const [updatePaymentRequestStatus, { isLoading: uLoading }] =
    useUpdatePaymentRequestStatusMutation();

  const handleStatusUpdate = async (id, status) => {
    const isConfirm = window.confirm("are you sure update this status?");
    if (!isConfirm) return;

    let res = await updatePaymentRequestStatus({ id, status });
    if (res?.data?.success) {
      toast.success("status updated");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <div className="flex justify-between items-center border-b p-2">
          <h2 className="text-lg font-medium">Payment Request</h2>
        </div>

        <div className="relative overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Sl</th>
                <th>User</th>
                <th>Package</th>
                <th>Payment Method</th>
                <th>Payment Info</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {packages?.map((item, i) => (
                <tr key={item?._id}>
                  <td>{i + 1}</td>
                  <td>
                    <p>{item?.user?.profile?.name}</p>
                    <p>{item?.user?.email}</p>
                  </td>
                  <td>
                    {item?.package?.title} - {item?.package?.type}
                  </td>
                  <td>
                    {item?.paymentMethod} - {item?.paymentType}
                  </td>
                  <td>
                    <p>ac:{item?.accountNumber}</p>
                    <p>#{item?.transactionId}</p>
                    <p>{item?.amount}TK</p>
                    <p>{item?.date}</p>
                  </td>
                  <td>
                    {uLoading ? (
                      <p>Loading</p>
                    ) : (
                      <select
                        className={`w-max cursor-pointer text-[13px] ${
                          item?.status == "pending"
                            ? "text-yellow-500 border-yellow-500"
                            : item?.status == "approved"
                            ? "text-green-600 border-green-600"
                            : "text-red-500 border-red-500"
                        }`}
                        value={item?.status}
                        onChange={(e) =>
                          handleStatusUpdate(item?._id, e.target.value)
                        }
                      >
                        <option value="pending" className="text-yellow-500">
                          Pending
                        </option>
                        <option value="approved" className="text-green-600">
                          Approved
                        </option>
                        <option value="rejected" className="text-red-500">
                          Rejected
                        </option>
                      </select>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-3">
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
