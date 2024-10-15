import { VscDebugBreakpointData } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useGetAcademySubChaptersQuery } from "../../../../../Redux/api/academy/subChapterApi";
import SubSubChapter from "../SubSubChapter/SubSubChapter";

export default function SubChapter({ chapter }) {
  let query = {};
  query["chapter"] = chapter;
  const { data } = useGetAcademySubChaptersQuery({ ...query });
  const subChapters = data?.data;

  return (
    <>
      {subChapters?.map((subChapter) => (
        <li key={subChapter?._id} className="">
          <div className="pl-7 border-t border-dashed py-1 flex justify-between items-center">
            <Link
              to=""
              className="flex items-center gap-1 hover:text-primary duration-200"
            >
              <VscDebugBreakpointData />
              <p>{subChapter?.name}</p>
            </Link>
          </div>

          <ul>
            <SubSubChapter subChapter={subChapter?._id} />
          </ul>
        </li>
      ))}
    </>
  );
}
