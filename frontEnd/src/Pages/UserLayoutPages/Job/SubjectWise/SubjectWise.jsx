import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import AdmissionSubject from "../../../../Components/Skeleton/AdmissionSubject";
import Subject from "./Subject";

export default function SubjectWise() {
  let query = {};
  const { data, isLoading } = useGetAcademySubjectsQuery({ ...query });
  const subjects = data?.data;

  if (isLoading) return <AdmissionSubject />;

  return (
    <div className="mt-3 grid md:grid-cols-2 gap-4">
      {subjects?.map((subject) => (
        <Subject key={subject?._id} subject={subject} />
      ))}
    </div>
  );
}
