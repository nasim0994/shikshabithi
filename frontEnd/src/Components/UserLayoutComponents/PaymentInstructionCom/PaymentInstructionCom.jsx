import parser from "html-react-parser";
import { useGetPaymentInstructionQuery } from "../../../Redux/api/paymentInstructionApi";

export default function PaymentInstructionCom() {
  const { data } = useGetPaymentInstructionQuery();
  const paymentInstruction = data?.data?.description;

  return (
    <div className="mt-4">
      <h3 className="tetx-xl sm:text-2xl font-semibold text-primary text-center italic section_line">
        ম্যানুয়াল পেমেন্ট পদ্ধতি
      </h3>

      <div className="mt-10">
        {paymentInstruction && parser(paymentInstruction || "")}
      </div>
    </div>
  );
}
