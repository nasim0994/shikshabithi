import { useParams } from "react-router-dom";
import Subject from "./Subject";
import SubjectMCQ from "../../../../Components/UserLayoutComponents/SubjectMCQ/SubjectMCQ";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetSingleAcademyClassQuery } from "../../../../Redux/api/academy/classApi";
import AcademySkeleton from "../../../../Components/Skeleton/AcademySkeleton";

export default function SubjectsF() {
  const { classId } = useParams();
  const cls = classId?.split("-")[1];

  const { data: clsData } = useGetSingleAcademyClassQuery(cls);

  let query = {};
  query["cls"] = cls;
  const { data, isLoading } = useGetAcademySubjectsQuery({ ...query });
  const subjects = data?.data;

  if (isLoading) return <AcademySkeleton />;

  return (
    <div>
      <section className="grid md:grid-cols-3 items-start gap-6">
        <div className="md:col-span-2 rounded overflow-hidden shadow">
          <div className="bg-primary text-base-100 text-center py-4 sm:text-xl font-medium">
            {clsData?.data?.name} - All Subjects
          </div>

          <div className="p-4 bg-base-100">
            <ul className="flex flex-col gap-6">
              {subjects?.map((subject) => (
                <Subject key={subject?._id} subject={subject} />
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded overflow-hidden shadow bg-base-100">
          <div className="bg-primary text-base-100 text-center py-4 sm:text-xl font-medium">
            Subject MCQ
          </div>

          <div className="p-6">
            <ul className="flex flex-col gap-2">
              {subjects?.map((subject) => (
                <SubjectMCQ key={subject?._id} subject={subject} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
