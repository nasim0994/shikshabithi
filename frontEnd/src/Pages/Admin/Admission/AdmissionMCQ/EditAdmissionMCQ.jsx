import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { useNavigate, useParams } from "react-router-dom";
import SelectedSubject from "./SelectedSubject";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetAdmissionUniversitiesQuery } from "../../../../Redux/api/admission/universityApi";
import { useGetAdmissionAllQuestionSetQuery } from "../../../../Redux/api/admission/questionSetApi";
import {
  useAddAdmissionMcqMutation,
  useGetSingleAdmissionMcqQuery,
} from "../../../../Redux/api/admission/admissionMcqApi";

export default function EditAdmissionMCQ() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleAdmissionMcqQuery(id);

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedMcqs, setSelectedMcqs] = useState([]);

  const { data: university } = useGetAdmissionUniversitiesQuery();
  const universities = university?.data;

  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedSet, setSelectedSet] = useState("");

  useEffect(() => {
    if (data?.success) {
      setSelectedUniversity(data?.data?.university?._id);
      setSelectedSet(data?.data?.questionSet?._id);
      setSelectedSubjects(data?.data?.subjects);
    }
  }, [data]);

  console.log(data?.data);

  let setQuery = {};
  setQuery["university"] = selectedUniversity;
  const { data: set } = useGetAdmissionAllQuestionSetQuery({ ...setQuery });
  let questionSets = set?.data;

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

    console.log(info);

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
        <h2>Edit Question Set</h2>
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
                value={selectedSet}
                onChange={(e) => setSelectedSet(e.target.value)}
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
                labelField="subject.name"
                valueField="_id"
                values={selectedSubjects}
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
              />
            ))}
          </div>

          <div>
            <button
              disabled={isLoading && "disabled"}
              className="secondary_btn"
            >
              {isLoading ? "Loading..." : "Edit Question Set"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
