import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import SelectedSubject from "./SelectedSubject";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetAdmissionUniversitiesQuery } from "../../../../Redux/api/admission/universityApi";
import { useGetAdmissionAllQuestionSetQuery } from "../../../../Redux/api/admission/questionSetApi";
import { useAddAdmissionMcqMutation } from "../../../../Redux/api/admission/admissionMcqApi";

export default function AddAdmissionMCQ() {
  const navigate = useNavigate();

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedMcqs, setSelectedMcqs] = useState([]);

  //------------University
  const { data } = useGetAdmissionUniversitiesQuery();
  const universities = data?.data;

  const [selectedUniversity, setSelectedUniversity] = useState("");
  useEffect(() => {
    if (universities?.length > 0) {
      setSelectedUniversity(universities[0]?._id);
    }
  }, [universities]);

  //------------question set
  let setQuery = {};
  setQuery["university"] = selectedUniversity;
  const { data: set } = useGetAdmissionAllQuestionSetQuery({ ...setQuery });
  let questionSets = set?.data;

  const [selectedSet, setSelectedSet] = useState("");
  useEffect(() => {
    if (questionSets?.length > 0) {
      setSelectedSet(questionSets[0]?._id);
    }
  }, [questionSets]);

  //------------subject
  let query = {};
  query["classuuid"] = 200;
  const { data: subject } = useGetAcademySubjectsQuery({ ...query });
  const subjects = subject?.data;

  const [addAdmissionMcq, { isLoading }] = useAddAdmissionMcqMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const university = e.target.university.value;
    const questionSet = e.target.questionSet.value;

    if (selectedSubjects?.length <= 0) {
      return toast.warning("subject is required!");
    }

    if (selectedSubjects?.length !== selectedMcqs?.length) {
      return toast.warning("mcq is required!");
    }

    const info = {
      university,
      questionSet,
      subjects: selectedMcqs,
    };

    let res = await addAdmissionMcq(info);
    if (res?.data?.success) {
      toast.success("Admission mcq add success");
      navigate("/admin/admission/mcq");
    } else {
      Swal.fire("", "something went wrong!", "error");
      console.log(res);
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h2>Add Admission MCQ</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleAdd} className="flex flex-col gap-3">
          <div className="grid sm:grid-cols-3 items-center gap-4">
            <div>
              <p className="mb-1">University</p>
              <select
                name="university"
                required
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                {universities?.map((u) => (
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
                selectedSet={selectedSet}
              />
            ))}
          </div>

          <div>
            <button
              disabled={isLoading && "disabled"}
              className="primary_btn text-sm"
            >
              {isLoading ? "Loading..." : "Add Question Set"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
