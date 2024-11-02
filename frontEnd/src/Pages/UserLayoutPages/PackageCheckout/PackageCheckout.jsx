import { AiFillWarning } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglePackageQuery } from "../../../Redux/api/packageApi";
import { IoClose } from "react-icons/io5";
import PaymentInstructionCom from "../../../Components/UserLayoutComponents/PaymentInstructionCom/PaymentInstructionCom";
import { useState } from "react";
import { useAddPaymentRequestMutation } from "../../../Redux/api/paymentRequestApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function PackageCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedUser } = useSelector((state) => state.user);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const { data } = useGetSinglePackageQuery(id);
  const packageData = data?.data;

  const total = parseInt(
    packageData?.price - (packageData?.price * packageData?.discount) / 100
  );

  const [addPaymentRequest, { isLoading }] = useAddPaymentRequestMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    if (paymentMethod === 1) {
      const data = {
        paymentType: e.target.paymentType.value,
        accountNumber: e.target.accountNumber.value,
        transactionId: e.target.transactionId.value,
        amount: parseInt(e.target.amount.value),
        paymentDate: e.target.date.value,
        package: id,
        paymentMethod: paymentMethod === 1 ? "Manual" : "SSL",
        user: loggedUser?.data?._id,
      };

      const res = await addPaymentRequest(data);

      if (res?.data?.success) {
        e.target.reset();
        toast.success("Request sent successfully");
        navigate("/packages");
      } else {
        toast.error(res?.data?.message || "Request failed");
        console.log(res);
      }
    }
  };

  return (
    <div>
      <h3 className="text-center text-2xl sm:text-3xl text-neutral font-bold">
        {packageData?.title}
      </h3>

      <div className="mt-10 grid lg:grid-cols-2 gap-10 xl:mx-28 items-start">
        <ul className="text-sm sm:text-[15px] text-neutral/80 flex flex-col gap-4 bg-base-100 p-4 rounded">
          <li className="flex justify-between items-center">
            <p>Free Model Test</p>
            <p className="rounded-lg bg-primary/70 px-2 text-[11px] text-base-100">
              {packageData?.feature?.freeModeltest}
            </p>
          </li>

          <li className="flex justify-between items-center">
            <p>Paid Model Test</p>
            <p className="rounded-lg bg-green-500 px-2 text-xs text-base-100">
              {packageData?.feature?.paidModeltest}
            </p>
          </li>

          <li className="flex justify-between items-center">
            <p>Paid Model Test (Vendor)</p>
            <p className="rounded-lg bg-pink-600 px-2 text-[11px] text-base-100">
              {packageData?.feature?.paidModeltestVendor}
            </p>
          </li>

          <li className="flex justify-between items-center">
            <p>On Demand Test</p>
            <p className="rounded-lg bg-green-500 px-2 text-[11px] text-base-100">
              {packageData?.feature?.onDemandtest}
            </p>
          </li>

          <li className="flex justify-between items-center">
            <p>Download Hand-note</p>
            <p className="rounded-lg bg-primary/70 px-2 text-[11px] text-base-100">
              {packageData?.feature?.downloadHandNote}
            </p>
          </li>

          <li className="flex justify-between items-center">
            <p>Download PDF Book</p>
            <p className="rounded-lg bg-green-500 px-2 text-xs text-base-100">
              {packageData?.feature?.downloadPdfBook}
            </p>
          </li>

          <li className="flex justify-between items-center">
            <p>Page View</p>
            <p className="rounded-lg bg-primary/70 px-2 text-[11px] text-base-100">
              {packageData?.feature?.pageView}
            </p>
          </li>

          <li className="flex justify-between items-center">
            <p>Ad Free Content</p>
            <p className="rounded-full bg-red-500 p-1 text-[11px] text-base-100">
              <IoClose />
            </p>
          </li>
        </ul>

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-neutral font-semibold ">
                {packageData?.title}
              </h3>
              <p>-</p>
              <p className="text-xs font-light">{packageData?.type}</p>
            </div>
            <p className="text-primary">
              {parseInt(
                packageData?.price -
                  (packageData?.price * packageData?.discount) / 100
              )}
              TK
            </p>
          </div>

          <div className="border-t flex justify-end gap-10 py-1.5 mt-1.5">
            <p>Total Ammount</p>
            <p>{total}TK</p>
          </div>

          <div className="border-t mt-1.5 py-1.5">
            <p className="text-sm">Select Payment Method:</p>

            <ul className="text-[15px] text-neutral flex flex-col gap-1 pl-2 mt-2">
              <li>
                <div className="flex items-center">
                  <input
                    id="cod"
                    type="radio"
                    name="payment_method"
                    className="w-3 h-3 cursor-pointer"
                    checked={paymentMethod === 1 && true}
                    onClick={() => setPaymentMethod(1)}
                  />
                  <label htmlFor="cod" className="ms-2 cursor-pointer">
                    Manual
                  </label>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <input
                    id="ssl"
                    type="radio"
                    name="payment_method"
                    className="w-3 h-3 cursor-pointer"
                    checked={paymentMethod === 2 && true}
                    onClick={() => setPaymentMethod(2)}
                  />
                  <label htmlFor="ssl" className="ms-2 cursor-pointer">
                    SSL
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <form onSubmit={handleAdd} className="mt-6">
            {paymentMethod == 1 && (
              <div>
                <div className="text-center">
                  <h2 className="text-xl font-medium">
                    Subscription Activation Request
                  </h2>
                  <p className="text-sm text-neutral-content mt-1">
                    Fill up the form and submit
                  </p>
                </div>

                <div className="mt-6 text-sm flex flex-col gap-2">
                  <div>
                    <p className="mb-1">Payment Type *</p>
                    <select name="paymentType">
                      <option value="bkash">Bkash</option>
                      <option value="nagad">Nagad</option>
                      <option value="rocket">Rocket</option>
                    </select>
                  </div>

                  <p className="text-xs">
                    উপরোক্ত পেমেন্ট মেথডে যে একাউন্ট থেকে পেমেন্ট করেছেন তা
                    রেফারেন্স হিসেবে উল্লেখ করুনঃ
                  </p>

                  <div>
                    <p className="mb-1">Account No. *</p>
                    <input type="text" name="accountNumber" />
                  </div>

                  <div>
                    <p className="mb-1">Transaction ID *</p>
                    <input type="text" name="transactionId" />
                  </div>

                  <div>
                    <p className="mb-1">Amount: *</p>
                    <input type="text" name="amount" />
                  </div>

                  <div>
                    <p className="mb-1">Payment Date: (optional)</p>
                    <input type="date" name="date" />
                  </div>

                  <div className="mt-2">
                    <button disabled={isLoading} className="primary_btn">
                      {isLoading ? "Loading..." : "Send Request for Activation"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod == 2 && (
              <div className="mt-4">
                <p className="text-yellow-700 text-sm flex items-start gap-2">
                  <p>
                    <AiFillWarning className="mt-[3px]" />
                  </p>
                  <p>
                    SSL security is currently not enabled for this payment
                    system. For the safety of your data, SSL support will be
                    added soon. Thank you for your patience and understanding.
                  </p>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="mt-20">
        <PaymentInstructionCom />
      </div>
    </div>
  );
}
