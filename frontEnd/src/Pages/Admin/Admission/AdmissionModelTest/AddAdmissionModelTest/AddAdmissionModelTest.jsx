import { useEffect, useState } from "react";
import { useGetAcademyMCQQuery } from "../../../../../Redux/api/academy/mcqApi";
import { useAddAdmissionModelTestMutation } from "../../../../../Redux/api/admission/admissionModelTestApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetAdmissionUniversitiesQuery } from "../../../../../Redux/api/admission/universityApi";
import { useGetAdmissionAllQuestionSetQuery } from "../../../../../Redux/api/admission/questionSetApi";

export default function AddAdmissionModelTest() {
  const navigate = useNavigate();

  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedSet, setSelectedSet] = useState("");

  const [selectedMcqs, setSelectedMcqs] = useState([]);
  const [error, setError] = useState("");

  const { data: university } = useGetAdmissionUniversitiesQuery();
  let universities = university?.data;

  let setQuery = {};
  setQuery["university"] = selectedUniversity;
  const { data: set } = useGetAdmissionAllQuestionSetQuery({ ...setQuery });
  let sets = set?.data;

  useEffect(() => {
    if (sets?.length > 0) {
      setSelectedSet(sets[0]?._id);
    }
  }, [sets]);

  let mcqQuery = {};
  mcqQuery["set"] = selectedSet;
  const { data: mcq } = useGetAcademyMCQQuery({ ...mcqQuery });

  // handle change mcq
  const handleOnchange = (value) => {
    if (value > mcq?.data?.length) {
      return setError(`${value} mcq not found!`);
    } else {
      setError("");
    }

    let mcqs = mcq?.data;
    let copiedArray = [...mcqs];
    for (let i = copiedArray?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }

    const randomMcq = copiedArray.slice(0, value);

    setSelectedMcqs(randomMcq?.map((item) => item?._id));
  };

  const [addAdmissionModelTest, { isLoading }] =
    useAddAdmissionModelTestMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    let form = e.target;
    let university = form.university.value;
    let set = form.set.value;
    let examType = form.examType.value;
    let name = form.name.value;
    let totalMark = form.totalMark.value;
    let negativeMark = form.negativeMark.value;
    let passMark = form.passMark.value;
    let duration = form.duration.value;
    let status = form.status.value;

    let info = {
      university,
      set,
      examType,
      name,
      mcqs: selectedMcqs,
      totalMark,
      negativeMark,
      passMark,
      duration,
      status,
    };

    let res = await addAdmissionModelTest(info);

    if (res?.data?.success) {
      toast.success("Exam Model Test add Success");
      navigate("/admin/admission/modelTest/all");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="border-b p-3">
        <h2>Add Model test</h2>
      </div>

      <div className="p-4">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="mb-1">University</p>
              <select
                name="university"
                required
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                {universities?.map((university) => (
                  <option key={university?._id} value={university?._id}>
                    {university?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Question Set</p>
              <select
                name="set"
                required
                onChange={(e) => setSelectedSet(e.target.value)}
              >
                {sets?.map((set) => (
                  <option key={set?._id} value={set?._id}>
                    {set?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Exam type</p>
              <select name="examType" required>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <div>
            <p className="mb-1">Name</p>
            <input type="text" name="name" required />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p>
                Total Question:{" "}
                <small className="text-neutral-content">
                  available question {mcq?.data?.length}
                </small>
              </p>
              <input
                onChange={(e) => handleOnchange(e.target.value)}
                type="number"
                name="totalQuestion"
                required
              />

              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <div>
              <p>Total Mark:</p>
              <input type="number" name="totalMark" required />
            </div>

            <div>
              <p>Pass Mark:</p>
              <input type="number" name="passMark" required />
            </div>

            <div>
              <p>Negative Mark:</p>
              <select name="negativeMark" required>
                <option value="0">0.00</option>
                <option value="0.25">0.25</option>
                <option value="0.50">0.50</option>
                <option value="0.1">0.1</option>
              </select>
            </div>

            <div>
              <p>
                Duration: <small className="text-neutral-content">min.</small>
              </p>
              <input type="number" name="duration" required />
            </div>

            <div>
              <p>Status:</p>
              <select name="status" required>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="deactive">Deactive</option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Add Model Test"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
