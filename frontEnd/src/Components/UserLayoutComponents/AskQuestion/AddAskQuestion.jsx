import { useState } from "react";
import AddAnsModal from "../../../Pages/UserLayoutPages/AskQuestion/AddAnsModal";
import { FaPlusSquare } from "react-icons/fa";

export default function AddAskQuestion({
  setSelectedQuestion,
  selectedQuestion,
  id,
}) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setModal(true);
          setSelectedQuestion(id);
        }}
        className="flex items-center gap-2 rounded px-2 py-1.5 bg-primary text-base-100 duration-300 text-xs"
      >
        <FaPlusSquare /> Answer
      </button>

      <AddAnsModal
        question={selectedQuestion}
        modal={modal}
        setModal={setModal}
      />
    </>
  );
}
