import { useParams } from "react-router-dom";
import { useGetAdmissionAllMcqQuery } from "../../../../Redux/api/admission/admissionMcqApi";
import { useGetSingleAdmissionQuestionSetQuery } from "../../../../Redux/api/admission/questionSetApi";
import SubjectWise from "./SubjectWise";

export default function QuestionBankDetails() {
  const { id } = useParams();
  const { data: set } = useGetSingleAdmissionQuestionSetQuery(id);

  let query = {};
  query["set"] = id;
  const { data } = useGetAdmissionAllMcqQuery({ ...query });
  const subjects = data?.data;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="rounded-t bg-primary text-base-100 text-center py-6 text-lg font-semibold">
          {set?.data?.name +
            " || " +
            set?.data?.university?.name +
            " || " +
            set?.data?.year}
        </div>

        <div className="mt-4">
          {subjects?.map((subject) => (
            <SubjectWise key={subject?._id} subject={subject} />
          ))}
        </div>
      </div>
    </div>
  );
}
