import { useParams } from "react-router-dom";
import SubjectWise from "./SubjectWise";
import { useGetSingleJobQuesSetQuery } from "../../../../Redux/api/job/jobQuesSetApi";
import { useGetJobAllMcqQuery } from "../../../../Redux/api/job/jobMcqApi";

export default function JobQuesSetDetails() {
  const { id } = useParams();
  const { data: set } = useGetSingleJobQuesSetQuery(id);

  let query = {};
  query["set"] = id;
  const { data } = useGetJobAllMcqQuery({ ...query });
  const subjects = data?.data;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="rounded-t bg-primary text-base-100 text-center py-6 text-lg font-semibold">
          {set?.data?.name +
            " || " +
            set?.data?.institute?.name +
            " || " +
            set?.data?.year}
        </div>

        <div className="mt-4">
          {subjects?.length > 0 ? (
            subjects?.map((subject) => (
              <SubjectWise key={subject?._id} subject={subject} />
            ))
          ) : (
            <p className="text-xs text-red-500">MCQ Not found!</p>
          )}
        </div>
      </div>
    </div>
  );
}
