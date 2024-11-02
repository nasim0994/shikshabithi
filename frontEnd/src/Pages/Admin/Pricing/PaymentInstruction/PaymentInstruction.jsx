import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  useAddPaymentInstructionMutation,
  useGetPaymentInstructionQuery,
  useUpdatePaymentInstructionMutation,
} from "../../../../Redux/api/paymentInstructionApi";

export default function PaymentInstruction() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data, isLoading } = useGetPaymentInstructionQuery();
  useEffect(() => {
    if (data?.data?.description) {
      setContent(data?.data?.description);
    }
  }, [data]);

  const [addPrivacy, { isLoading: addIsLoading }] =
    useAddPaymentInstructionMutation();

  const [updatePrivacy, { isLoading: updateIsLoading }] =
    useUpdatePaymentInstructionMutation();

  const handlePaymentInstruction = async (e) => {
    e.preventDefault();
    const info = { description: content };

    const id = data?.data?._id;

    try {
      if (id) {
        const res = await updatePrivacy({ id, data: info });
        if (res?.data?.success) {
          toast.success("Payment Instruction updated successfully");
        } else {
          toast.error("Something went wrong");
          console.log(res);
        }
      } else {
        const res = await addPrivacy(info);
        if (res?.data?.success) {
          toast.success("Payment Instruction added successfully");
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="make_privacy_policy">
      <h2 className="mb-3 text-center text-xl font-medium text-primary sm:text-2xl">
        Payment Instruction Setting
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handlePaymentInstruction}>
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            className="h400"
          />
          <div className="mt-4">
            <button
              className="primary_btn"
              disabled={addIsLoading || updateIsLoading}
            >
              {addIsLoading || updateIsLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
