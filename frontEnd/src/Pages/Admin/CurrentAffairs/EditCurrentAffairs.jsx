import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCurrentAffairQuery,
  useUpdateCurrentAffairMutation,
} from "../../../Redux/api/currentAffairsApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function EditCurrentAffairs() {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState();
  const { data } = useGetCurrentAffairQuery(id);
  const ca = data?.data;

  useEffect(() => {
    setSelectedCategory(ca?.category);
  }, [ca]);

  const navigate = useNavigate();

  const [updateCurrentAffair, { isLoading }] = useUpdateCurrentAffairMutation();

  const handleEdit = async (e) => {
    e.preventDefault();

    const question = e.target.question.value;
    const ans = e.target.ans.value;
    const category = e.target.category.value;

    const info = {
      question,
      ans,
      category,
      user: ca?.user?._id,
    };

    const res = await updateCurrentAffair({ id, info });
    console.log(res);

    if (res?.data?.success) {
      toast.success("update success");
      navigate("/admin/current-affairs");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <div className="bg-base-100 rounded shadow p-3">
      <div className="text-center">
        <h3 className="font-medium text-lg">Update Question</h3>
        <p className="text-sm text-neutral-content">Fill the form and submit</p>
      </div>

      <form onSubmit={handleEdit} className="mt-6 flex flex-col gap-3">
        <div>
          <p className="mb-1 text-sm">
            Question <sup className="text-xs text-red-500">*</sup>
          </p>
          <input
            type="text"
            name="question"
            required
            defaultValue={ca?.question}
          />
        </div>

        <div>
          <p className="mb-1 text-sm">
            Ans <sup className="text-xs text-red-500">*</sup>
          </p>
          <textarea name="ans" required defaultValue={ca?.ans}></textarea>
        </div>

        <div>
          <p className="mb-1 text-sm">
            Category <sup className="text-xs text-red-500">*</sup>
          </p>
          <select
            name="category"
            className="w-max"
            required
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
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
