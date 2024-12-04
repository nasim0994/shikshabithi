import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddFaqMutation } from "../../../../Redux/api/FaqApi";

export default function AddFaq() {
  const navigate = useNavigate();
  const [addFaq, { isLoading }] = useAddFaqMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const form = e.target;
    const question = form.question.value;
    const ans = form.ans.value;

    const info = {
      question,
      ans,
    };

    let res = await addFaq(info);
    if (res?.data?.success) {
      toast.success("Faq add success");
      navigate("/admin/page/faq");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <h2 className="p-2 border-b text-lg font-medium">Add FAQ</h2>

        <form onSubmit={handleAdd} className="p-4 md:w-2/3 mx-auto">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Question</p>
              <input type="text" name="question" required />
            </div>
            <div>
              <p className="mb-1">Ans</p>
              <textarea name="ans" rows={10} required></textarea>
            </div>
          </div>

          <div className="mt-6">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
