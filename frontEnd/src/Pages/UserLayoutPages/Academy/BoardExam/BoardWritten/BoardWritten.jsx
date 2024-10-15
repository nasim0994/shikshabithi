import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetBoardsQuery } from "../../../../../Redux/api/board/boardApi";
import { useGetYearsQuery } from "../../../../../Redux/api/yearApi";
import { useGetAcademySubjectsQuery } from "../../../../../Redux/api/academy/subjectApi";
import { useGetAcademyClassesQuery } from "../../../../../Redux/api/academy/classApi";
import Pagination from "../../../../../Components/Pagination/Pagination";
import { useGetBoardWrittensQuery } from "../../../../../Redux/api/board/boardWrittenApi";
import AcademySkeleton from "../../../../../Components/Skeleton/AcademySkeleton";

export default function BoardWritten() {
  const queryParams = new URLSearchParams(location.search);
  const classId = queryParams.get("class");

  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedClass(classId);
  }, [classId]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  // ---------class

  const { data: cls } = useGetAcademyClassesQuery();
  const classes = cls?.data;

  const filterCls = classes?.filter(
    (cls) => cls?.category?.uuid !== "101" && cls?.category?.uuid !== "102"
  );

  //------------Boards
  const { data } = useGetBoardsQuery();
  const boards = data?.data;

  //------------Years
  const { data: yearsList } = useGetYearsQuery();
  const years = yearsList?.data;

  //------------subject
  let subjectQuery = {};
  subjectQuery["cls"] = selectedClass;
  const { data: subject } = useGetAcademySubjectsQuery({ ...subjectQuery });
  const subjects = subject?.data;

  let query = {};
  query["board"] = selectedBoard;
  query["year"] = selectedYear;
  query["cls"] = selectedClass;
  query["subject"] = selectedSubject;
  query["page"] = currentPage;
  query["limit"] = 10;

  const {
    data: boardWritten,
    isLoading,
    isFetching,
  } = useGetBoardWrittensQuery({ ...query });
  const boardWrittens = boardWritten?.data;

  if (isLoading || isFetching) {
    return <AcademySkeleton />;
  }

  return (
    <div>
      <section className="">
        <div className="rounded overflow-hidden">
          <div className="bg-primary text-base-100 text-center py-4">
            <h1 className="sm:text-xl font-medium">Board Exam</h1>
            <p className="text-sm">
              All Question - ({boardWritten?.meta?.total})
            </p>
          </div>

          <div className="p-4 bg-base-100">
            <ul className="flex items-center justify-center gap-2 text-xs text-base-100">
              <li>
                <Link
                  to="/academy/board-exam/mcq"
                  className="bg-primary px-4 py-2 rounded"
                >
                  MCQ
                </Link>
              </li>
              <li>
                <Link
                  to="/academy/board-exam/written"
                  className="bg-sky-500 px-4 py-2 rounded"
                >
                  Written
                </Link>
              </li>
            </ul>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 text-sm lg:grid-cols-4 gap-4">
              <div>
                <p className="mb-1">Board</p>
                <select
                  required
                  onChange={(e) => setSelectedBoard(e.target.value)}
                  value={selectedBoard}
                >
                  <option value="">All</option>
                  {boards?.map((board) => (
                    <option key={board?._id} value={board?._id}>
                      {board?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-1">Class</p>
                <select
                  required
                  onChange={(e) => setSelectedClass(e.target.value)}
                  value={selectedClass}
                >
                  <option value="">All</option>
                  {filterCls?.map((cls) => (
                    <option key={cls?._id} value={cls?._id}>
                      {cls?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-1">Subject</p>
                <select
                  required
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  value={selectedSubject}
                >
                  <option value="">All</option>
                  {subjects?.map((subject) => (
                    <option key={subject?._id} value={subject?._id}>
                      {subject?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-1">Year</p>
                <select
                  required
                  onChange={(e) => setSelectedYear(e.target.value)}
                  value={selectedYear}
                >
                  <option value="">All</option>
                  {years?.map((year) => (
                    <option key={year?._id} value={year?.year}>
                      {year?.year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            {boardWrittens?.map((item) => (
              <div
                key={item?._id}
                className="flex justify-between items-center p-4 mt-3 bg-white shadow rounded-lg mb-2"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-1 rounded-full bg-primary"></div>
                  <div>
                    <Link to={item?._id} className="font-semibold text-gray-800">
                      {item?.subject?.name}
                    </Link>
                    <div className="flex gap-2">
                      <p className="text-xs font-normal text-black bg-gray-100 py-1 px-2 rounded">
                        {item?.year}
                      </p>
                      <p className="text-xs font-normal text-black bg-gray-100 py-1 px-2 rounded">
                        {item?.board?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-neutral-content bg-gray-200 px-2 py-1 text-xs rounded font-normal">
                    Written {item?.writtens?.length}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {boardWrittens?.meta?.pages > 1 && (
            <Pagination
              pages={boardWrittens?.meta?.pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </section>
    </div>
  );
}
