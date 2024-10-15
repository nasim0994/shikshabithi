import { useState } from "react";
import { useGetFaqQuery } from "../../../Redux/api/FaqApi";
import { HiOutlinePlusSm, HiMinusSm } from "react-icons/hi";

export default function Faqs() {
  const { data, isLoading } = useGetFaqQuery();
  const faqs = data?.data;

  const [active, setActive] = useState(null);
  const handelToggleFAQ = (i) => {
    if (active === i) {
      return setActive(null);
    }
    setActive(i);
  };

  if (isLoading) return "Loading...";

  return (
    <div>
      <div className="text-center text-2xl font-medium text-neutral">
        <h3>FAQ</h3>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {faqs?.map((faq, i) => (
          <div
            key={faq?._id}
            className="faq w-full md:w-2/3 mx-auto bg-base-100"
          >
            <button
              onClick={() => handelToggleFAQ(i)}
              className="w-full flex justify-between items-center p-4 bg-primary/10 rounded-t"
            >
              <h3>{faq.question}</h3>

              {active == i ? <HiMinusSm /> : <HiOutlinePlusSm />}
            </button>

            <div
              className={`faq_ans text-neutral ${
                active == i && "faq_ans_show"
              }`}
            >
              <p className="p-3 text-sm">{faq.ans}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
