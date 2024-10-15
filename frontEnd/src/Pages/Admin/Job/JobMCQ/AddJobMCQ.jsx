import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import SelectedSubject from "./SelectedSubject";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetInstitutesQuery } from "../../../../Redux/api/job/instituteApi";
import { useGetJobQuesSetQuery } from "../../../../Redux/api/job/jobQuesSetApi";
import { useAddJobMcqMutation } from "../../../../Redux/api/job/jobMcqApi";

export default function AddJobMCQ() {
  const navigate = useNavigate();

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedMcqs, setSelectedMcqs] = useState([]);

  //------------institute
  const { data } = useGetInstitutesQuery();
  const institutes = data?.data;

  const [selectedInstitute, setSelectedInstitute] = useState("");
  useEffect(() => {
    if (institutes?.length > 0) {
      setSelectedInstitute(institutes[0]?._id);
    }
  }, [institutes]);

  //------------question set
  let setQuery = {};
  setQuery["institute"] = selectedInstitute;
  const { data: set } = useGetJobQuesSetQuery({ ...setQuery });
  let questionSets = set?.data;

  const [selectedSet, setSelectedSet] = useState("");
  useEffect(() => {
    if (questionSets?.length > 0) {
      setSelectedSet(questionSets[0]?._id);
    }
  }, [questionSets]);

  //------------subject
  const { data: subject } = useGetAcademySubjectsQuery({});
  const subjects = subject?.data;

  const [addJobMcq, { isLoading }] = useAddJobMcqMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const institute = e.target.institute.value;
    const questionSet = e.target.questionSet.value;

    if (selectedSubjects?.length <= 0) {
      return toast.warning("subject is required!");
    }

    if (selectedSubjects?.length !== selectedMcqs?.length) {
      return toast.warning("mcq is required!");
    }

    const info = {
      institute,
      questionSet,
      subjects: selectedMcqs,
    };

    let res = await addJobMcq(info);
    if (res?.data?.success) {
      toast.success("Job mcq add success");
      navigate("/admin/job/mcq");
    } else {
      Swal.fire("", "something went wrong!", "error");
      console.log(res);
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium">Add Job MCQ</h3>
      </div>
      <div className="p-4">
        <form onSubmit={handleAdd} className="flex flex-col gap-3">
          <div className="grid sm:grid-cols-3 items-center gap-4">
            <div>
              <p className="mb-1">Institutes</p>
              <select
                name="institute"
                required
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
              >
                {institutes?.map((u) => (
                  <option key={u?._id} value={u?._id}>
                    {u?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Question Set</p>
              <select
                name="questionSet"
                required
                onChange={(e) => setSelectedSet(e.target.value)}
                value={selectedSet}
              >
                {questionSets?.map((set) => (
                  <option key={set?._id} value={set?._id}>
                    {set?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div>
              <p>Select Subjects</p>
              <Select
                multi
                options={subjects}
                labelField="name"
                valueField="_id"
                onChange={(values) => setSelectedSubjects(values)}
              />
            </div>
          </div>

          <div>
            {selectedSubjects?.map((subject, i) => (
              <SelectedSubject
                key={i}
                subject={subject}
                selectedMcqs={selectedMcqs}
                setSelectedMcqs={setSelectedMcqs}
                selectedJobSet={selectedSet}
              />
            ))}
          </div>

          <div>
            <button
              disabled={isLoading && "disabled"}
              className="primary_btn text-sm"
            >
              {isLoading ? "Loading..." : "Add Job MCQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
