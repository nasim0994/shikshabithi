import { useState } from "react";
import { toast } from "react-toastify";
import ModelTestModal from "../../../../Components/UserLayoutComponents/Exam/ModelTestModal/ModelTestModal";

export default function ModeltestStartBtn({
  packageData,
  modelTestAttendLength,
  modelTest,
}) {
  const [modelModal, setModelModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState({});

  const category = modelTest?.mainCategory;

  const handleStart = (model) => {
    if (!packageData?.package && model?.examType == "paid") {
      toast.error("You need to purchase a package to attend this exam");
      return;
    }

    if (
      !packageData?.package &&
      model?.examType == "free" &&
      modelTestAttendLength >= 2
    ) {
      toast.error("You have reached the limit of free exams");
      return;
    }

    const freeModelTestLimit = packageData?.package?.feature?.freeModeltest;
    const paidModelTestLimit = packageData?.package?.feature?.paidModeltest;

    const isExpired = new Date(packageData?.expires) < new Date();
    if (isExpired) {
      toast.error("Your package has expired");
      return;
    }

    if (
      packageData?.package &&
      model?.examType == "free" &&
      modelTestAttendLength >= freeModelTestLimit
    ) {
      toast.error("You have reached the limit of free exams");
      return;
    }

    if (
      packageData?.package &&
      model?.examType == "paid" &&
      modelTestAttendLength >= paidModelTestLimit
    ) {
      toast.error("You have reached the limit of paid exams");
      return;
    }

    setSelectedModel(model);
    setModelModal(true);
  };

  return (
    <div>
      <button
        onClick={() => handleStart(modelTest)}
        className={`text-base-100 px-2 py-1 rounded duration-200 ${
          modelTest?.examType == "free"
            ? "bg-green-500  hover:bg-green-600"
            : "bg-red-500  hover:bg-red-600"
        }`}
      >
        Start Now
      </button>

      <ModelTestModal
        model={selectedModel}
        modelModal={modelModal}
        setModelModal={setModelModal}
        category={category}
      />
    </div>
  );
}
