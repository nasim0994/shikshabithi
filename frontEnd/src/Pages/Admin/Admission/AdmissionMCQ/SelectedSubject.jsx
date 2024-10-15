import { useState } from "react";
import { useGetAcademyMCQQuery } from "../../../../Redux/api/academy/mcqApi";

export default function SelectedSubject({
  subject,
  selectedMcqs,
  setSelectedMcqs,
  selectedSet,
}) {
  let query = {};
  query["subject"] = subject?._id;
  query["set"] = selectedSet;

  const { data: mcq } = useGetAcademyMCQQuery({ ...query });
  const mcqs = mcq?.data;
  const [error, setError] = useState("");
  const handleOnchange = (subject, value) => {
    if (value > mcqs?.length) {
      return setError(`${value} mcq not found!`);
    } else {
      setError("");
    }

    let copiedArray = [...mcqs];
    for (let i = copiedArray?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }

    const randomMcq = copiedArray.slice(0, value);

    const isExid = selectedMcqs?.find((item) => item?.subject == subject?._id);
    if (!isExid) {
      setSelectedMcqs([
        ...selectedMcqs,
        { subject: subject?._id, mcqs: randomMcq?.map((item) => item?._id) },
      ]);
    } else {
      setSelectedMcqs(
        selectedMcqs.map((item) =>
          item.subject === subject?._id
            ? { ...item, mcqs: randomMcq?.map((item) => item?._id) }
            : item
        )
      );
    }
  };

  return (
    <div className="mt-2 border rounded p-4">
      <h2 className="text-lg text-secondary">
        {subject?.name}{" "}
        <small className="text-neutral-content text-xs">
          Available MCQ: {mcqs?.length}
        </small>
      </h2>
      <div className="flex items-center gap-2">
        <p className="mb-1.5">MCQs:</p>
        <div>
          <input
            type="text"
            onChange={(e) => handleOnchange(subject, e.target.value)}
          />

          <small className="text-red-500 mt-1">{error}</small>
        </div>
      </div>
    </div>
  );
}
