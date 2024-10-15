import AcademySkeleton from "../../../../Components/Skeleton/AcademySkeleton";
import { useGetAcademyMCQQuery } from "../../../../Redux/api/academy/mcqApi";
import Mcq from "../McqF/Mcq";

export default function RelatedMcqs({ category, subject }) {
  let query = {};
  query["category"] = category;
  query["subject"] = subject;
  query["limit"] = 5;
  const { data, isLoading } = useGetAcademyMCQQuery({ ...query });
  let mcqs = data?.data;

  if (isLoading) return <AcademySkeleton />;

  return (
    <div className="mt-3 flex flex-col gap-2">
      {mcqs?.map((mcq, i) => (
        <Mcq key={i} mcq={mcq} i={i} page={1} limit={10} />
      ))}
    </div>
  );
}
