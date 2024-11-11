import { MdFeaturedPlayList, MdOutlineCategory } from "react-icons/md";
import { TbPackages } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { useGetFeatureQuery } from "../../../Redux/api/featureApi";
import { useGetAllAdminsQuery } from "../../../Redux/api/user/adminApi";
import { useGetPackagesQuery } from "../../../Redux/api/packageApi";
import { useGetAcademyCategoriesQuery } from "../../../Redux/api/academy/categoryApi";
import { useGetAcademyClassesQuery } from "../../../Redux/api/academy/classApi";
import { useGetAcademySubjectsQuery } from "../../../Redux/api/academy/subjectApi";
import { useGetAcademyMCQQuery } from "../../../Redux/api/academy/mcqApi";
import { useGetAcademyWrittenQuery } from "../../../Redux/api/academy/writtenApi";
import { useGetBoardMcqsQuery } from "../../../Redux/api/board/boardMcqApi";
import { useGetBoardWrittensQuery } from "../../../Redux/api/board/boardWrittenApi";
import { useGetBlogsQuery } from "../../../Redux/api/blogsApi";
import { useGetAllUsersQuery } from "../../../Redux/api/user/userApi";
import { useGetModelTestQuery } from "../../../Redux/api/modelTestApi";

export default function Dashboard() {
  const { data: feature } = useGetFeatureQuery();
  const { data: category } = useGetAcademyCategoriesQuery();
  const { data: packageD } = useGetPackagesQuery();
  const { data: admin } = useGetAllAdminsQuery();
  const { data: cls } = useGetAcademyClassesQuery();
  const { data: subject } = useGetAcademySubjectsQuery();
  const { data: mcq } = useGetAcademyMCQQuery();
  const { data: written } = useGetAcademyWrittenQuery();
  const { data: modeltest } = useGetModelTestQuery();
  const { data: boardMcq } = useGetBoardMcqsQuery();
  const { data: boardWritten } = useGetBoardWrittensQuery();
  const { data: blogs } = useGetBlogsQuery();
  const { data: user } = useGetAllUsersQuery();

  const totalExam = modeltest?.data?.length;

  return (
    <div>
      <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`shadow rounded p-4 bg-secondary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Category</h3>
            </div>
            <div>
              <MdOutlineCategory className="text-2xl" />
            </div>
          </div>

          <p>{category?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-blue-500 text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Class</h3>
            </div>
            <div>
              <MdOutlineCategory className="text-2xl" />
            </div>
          </div>

          <p>{cls?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-secondary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Subject</h3>
            </div>
            <div>
              <MdOutlineCategory className="text-2xl" />
            </div>
          </div>

          <p>{subject?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-green-500 text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total MCQ</h3>
            </div>
            <div>
              <MdOutlineCategory className="text-2xl" />
            </div>
          </div>

          <p>{mcq?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-primary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Written</h3>
            </div>
            <div>
              <MdOutlineCategory className="text-2xl" />
            </div>
          </div>

          <p>{written?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-secondary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Model Test</h3>
            </div>
            <div>
              <MdOutlineCategory className="text-2xl" />
            </div>
          </div>

          <p>
            {totalExam >= 1000
              ? (totalExam / 1000).toFixed(1) + "K"
              : totalExam}
          </p>
        </div>

        <div className={`shadow rounded p-4 bg-primary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Board MCQ</h3>
            </div>
            <div>
              <MdOutlineCategory className="text-2xl" />
            </div>
          </div>

          <p>{boardMcq?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-secondary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Board Written</h3>
            </div>
            <div>
              <MdOutlineCategory className="text-2xl" />
            </div>
          </div>

          <p>{boardWritten?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-blue-600 text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Admin</h3>
            </div>
            <div>
              <RiAdminFill className="text-2xl" />
            </div>
          </div>

          <p>{admin?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-primary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total User</h3>
            </div>
            <div>
              <MdOutlineCategory className="text-2xl" />
            </div>
          </div>

          <p>{user?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-secondary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Blogs</h3>
            </div>
            <div>
              <MdFeaturedPlayList className="text-2xl" />
            </div>
          </div>

          <p>{blogs?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-green-600 text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total PACKAGE</h3>
            </div>
            <div>
              <TbPackages className="text-2xl" />
            </div>
          </div>

          <p>{packageD?.data?.length}</p>
        </div>

        <div className={`shadow rounded p-4 bg-primary text-base-100`}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Feature</h3>
            </div>
            <div>
              <MdFeaturedPlayList className="text-2xl" />
            </div>
          </div>

          <p>{feature?.data?.length}</p>
        </div>
      </section>
    </div>
  );
}
