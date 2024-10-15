import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetSingleFaqQuery,
  useUpdateFaqMutation,
} from "../../../../Redux/api/FaqApi";

export default function EditFaq() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleFaqQuery(id);
  const faq = data?.data;

  const [updateFaq, { isLoading }] = useUpdateFaqMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const question = form.question.value;
    const ans = form.ans.value;

    const info = {
      question,
      ans,
    };

    let res = await updateFaq({ id, info });
    if (res?.data?.success) {
      toast.success("Faq edit success");
      navigate("/admin/front-end/faq");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Edit FAQ</h2>

        <form onSubmit={handleUpdate} className="p-4 md:w-2/3 mx-auto">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Question</p>
              <input
                type="text"
                name="question"
                required
                defaultValue={faq?.question}
              />
            </div>
            <div>
              <p className="mb-1">Ans</p>
              <textarea
                name="ans"
                rows={10}
                required
                defaultValue={faq?.ans}
              ></textarea>
            </div>
          </div>

          <div className="mt-6">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
