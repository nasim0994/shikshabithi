import { Link } from "react-router-dom";
import { useGetAcademySubSubChaptersQuery } from "../../../../../Redux/api/academy/subSubChapterApi";
import { VscDebugBreakpointData } from "react-icons/vsc";

export default function SubSubChapter({ subChapter }) {
  let query = {};
  query["subChapter"] = subChapter;
  const { data } = useGetAcademySubSubChaptersQuery({ ...query });
  const subSubChapters = data?.data;

  return (
    <>
      {subSubChapters?.map((subSubChapter) => (
        <li key={subSubChapter?._id} className="">
          <div className="pl-12 border-t border-dashed py-1 flex justify-between items-center">
            <Link
              to=""
              className="flex items-center gap-1 hover:text-primary duration-200"
            >
              <VscDebugBreakpointData />
              <p>{subSubChapter?.name}</p>
            </Link>
          </div>
        </li>
      ))}
    </>
  );
}
