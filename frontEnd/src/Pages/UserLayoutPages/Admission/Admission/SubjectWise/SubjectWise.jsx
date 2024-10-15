import AdmissionSubject from "../../../../../Components/Skeleton/AdmissionSubject";
import { useGetAcademySubjectsQuery } from "../../../../../Redux/api/academy/subjectApi";
import Subject from "./Subject";

export default function SubjectWise() {
  let query = {};
  query["classuuid"] = 200;
  const { data, isLoading } = useGetAcademySubjectsQuery({ ...query });
  const subjects = data?.data;

  if (isLoading) return <AdmissionSubject />;

  return (
    <div className="mt-2 grid md:grid-cols-2 gap-2">
      {subjects?.map((subject) => (
        <Subject key={subject?._id} subject={subject} />
      ))}
    </div>
  );
}
