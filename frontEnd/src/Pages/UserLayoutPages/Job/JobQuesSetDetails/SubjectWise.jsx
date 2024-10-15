import Subject from "./Subject";

export default function SubjectWise({ subject }) {
  let subjects = subject?.subjects;

  return (
    <div className="flex flex-col gap-4">
      {subjects?.map((subject) => (
        <Subject key={subject?._id} subject={subject} />
      ))}
    </div>
  );
}
