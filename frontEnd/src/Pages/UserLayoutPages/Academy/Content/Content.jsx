import { useParams } from "react-router-dom";
import { useGetAcademyContentsQuery } from "../../../../Redux/api/academy/contentApi";
import perser from "html-react-parser";
import { useGetSingleAcademyChapterQuery } from "../../../../Redux/api/academy/chapterApi";
import AcademySkeleton from "../../../../Components/Skeleton/AcademySkeleton";

export default function Content() {
  const { chapterId } = useParams();
  const chapter = chapterId.split("-")[1];

  const { data: chapterInfo } = useGetSingleAcademyChapterQuery(chapter);
  const { data, isLoading } = useGetAcademyContentsQuery(chapter);

  if (isLoading) return <AcademySkeleton />;

  return (
    <div>
      <section className="grid md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 bg-base-100 shadow rounded overflow-hidden">
          <div className="bg-primary text-base-100 text-center sm:text-lg font-medium py-3">
            {chapterInfo?.data?.name}
          </div>

          <div className="p-3">
            {data?.data?.length > 0 && perser(data?.data[0]?.content)}
          </div>
        </div>
        <div className="bg-base-100 shadow rounded overflow-hidden"></div>
      </section>
    </div>
  );
}
