import { useEffect, useState } from "react";
import { useGetAcademyMCQQuery } from "../../../../Redux/api/academy/mcqApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleJobModelTestQuery,
  useUpdateJobModelTestMutation,
} from "../../../../Redux/api/job/jobModelTestApi";
import { useGetInstitutesQuery } from "../../../../Redux/api/job/instituteApi";
import { useGetJobQuesSetQuery } from "../../../../Redux/api/job/jobQuesSetApi";

export default function EditJobModelTest() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedSet, setSelectedSet] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedMcqs, setSelectedMcqs] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedNegativeMark, setSelectedNegativeMark] = useState("");
  const [error, setError] = useState("");

  // modeltest
  const { data } = useGetSingleJobModelTestQuery(id);
  let modeltest = data?.data;

  useEffect(() => {
    if (modeltest?._id) {
      setSelectedInstitute(modeltest?.institute?._id);
      setSelectedSet(modeltest?.set?._id);
      setSelectedExamType(modeltest?.examType);
      setSelectedStatus(modeltest?.status);
      setSelectedNegativeMark(modeltest?.negativeMark);
      setSelectedMcqs(modeltest?.mcqs);
    }
  }, [modeltest]);

  const { data: institute } = useGetInstitutesQuery();
  let institutes = institute?.data;

  let setQuery = {};
  setQuery["institute"] = selectedInstitute;
  const { data: set } = useGetJobQuesSetQuery({ ...setQuery });
  let sets = set?.data;

  let mcqQuery = {};
  mcqQuery["set"] = selectedSet;
  const { data: mcq } = useGetAcademyMCQQuery({ ...mcqQuery });

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

  const [updateJobModelTest, { isLoading }] = useUpdateJobModelTestMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    let form = e.target;
    let institute = form.institute.value;
    let set = form.set.value;
    let examType = form.examType.value;
    let name = form.name.value;
    let totalMark = form.totalMark.value;
    let negativeMark = form.negativeMark.value;
    let passMark = form.passMark.value;
    let duration = form.duration.value;
    let status = form.status.value;

    let info = {
      institute,
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

    let res = await updateJobModelTest({ id, info });

    if (res?.data?.success) {
      toast.success("Exam Model Test edit Success");
      navigate("/admin/job/modelTest/all");
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  return (
    <div className="bg-base-100 shadow rounded">
      <div className="border-b p-3">
        <h3 className="font-medium">Edit Model test</h3>
      </div>

      <div className="p-4">
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="mb-1">Institute</p>
              <select
                name="institute"
                required
                onChange={(e) => setSelectedInstitute(e.target.value)}
                value={selectedInstitute}
              >
                {institutes?.map((institute) => (
                  <option key={institute?._id} value={institute?._id}>
                    {institute?.name}
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
                value={selectedSet}
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
              <select
                name="examType"
                required
                onChange={(e) => setSelectedExamType(e.target.value)}
                value={selectedExamType}
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <div>
            <p className="mb-1">Name</p>
            <input
              type="text"
              name="name"
              required
              defaultValue={modeltest?.name}
            />
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
                defaultValue={modeltest?.mcqs?.length}
              />

              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <div>
              <p>Total Mark:</p>
              <input
                type="number"
                name="totalMark"
                required
                defaultValue={modeltest?.totalMark}
              />
            </div>

            <div>
              <p>Pass Mark:</p>
              <input
                type="number"
                name="passMark"
                required
                defaultValue={modeltest?.passMark}
              />
            </div>

            <div>
              <p>Negative Mark:</p>
              <select
                name="negativeMark"
                value={selectedNegativeMark}
                required
                onChange={(e) => setSelectedNegativeMark(e.target.value)}
              >
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
              <input
                type="number"
                name="duration"
                required
                defaultValue={modeltest?.duration}
              />
            </div>

            <div>
              <p>Status:</p>
              <select
                name="status"
                required
                onChange={(e) => setSelectedStatus(e.target.value)}
                value={selectedStatus}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="deactive">Deactive</option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Edit Model Test"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
