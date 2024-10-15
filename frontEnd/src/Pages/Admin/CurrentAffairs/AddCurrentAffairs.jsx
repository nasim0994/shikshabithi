import { useSelector } from "react-redux";
import { useAddCurrentAffairMutation } from "../../../Redux/api/currentAffairsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddCurrentAffairs() {
  const { loggedUser } = useSelector((store) => store.user);
  const [addCurrentAffair, { isLoading }] = useAddCurrentAffairMutation();
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();

    const question = e.target.question.value;
    const ans = e.target.ans.value;
    const category = e.target.category.value;

    const info = {
      question,
      ans,
      category,
      user: loggedUser?.data?._id,
    };

    const res = await addCurrentAffair(info);
    if (res?.data?.success) {
      toast.success("add success");
      navigate("/admin/current-affairs");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <div className="bg-base-100 rounded shadow p-3">
      <div className="text-center">
        <h3 className="font-medium text-lg">Add New Question</h3>
        <p className="text-sm text-neutral-content">Fill the form and submit</p>
      </div>

      <form onSubmit={handleAdd} className="mt-6 flex flex-col gap-3">
        <div>
          <p className="mb-1 text-sm">
            Question <sup className="text-xs text-red-500">*</sup>
          </p>
          <input type="text" name="question" required />
        </div>

        <div>
          <p className="mb-1 text-sm">
            Ans <sup className="text-xs text-red-500">*</sup>
          </p>
          <textarea name="ans" required></textarea>
        </div>

        <div>
          <p className="mb-1 text-sm">
            Category <sup className="text-xs text-red-500">*</sup>
          </p>
          <select name="category" className="w-max" required>
            <option value="1">Bangladesh</option>
            <option value="2">International</option>
            <option value="3">Bangladesh & International</option>
          </select>
        </div>

        <div className="mt-1">
          <button className="primary_btn text-sm">
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
