import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Mcq from "./Mcq";
import ExamInfoModal from "../OnDemandTest/ExamInfoModal";
import { useGetSingleAcademySubjectQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetAcademyMCQQuery } from "../../../../Redux/api/academy/mcqApi";
import { useGetSingleAcademyChapterQuery } from "../../../../Redux/api/academy/chapterApi";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useGetSingleAcademyClassQuery } from "../../../../Redux/api/academy/classApi";
import { useGetTagQuery } from "../../../../Redux/api/tagApi";
import { useGetSingleAdmissionQuestionSetQuery } from "../../../../Redux/api/admission/questionSetApi";

export default function McqF() {
  window.scroll(0, 0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subjectId = queryParams.get("subject");
  const chapterId = queryParams.get("chapter");
  const classId = queryParams.get("class");
  const tagId = queryParams.get("tag");
  const setId = queryParams.get("set");

  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetSingleAcademyClassQuery(classId);
  const cls = data?.data;

  const { data: subjectInfo } = useGetSingleAcademySubjectQuery(subjectId);
  const subject = subjectInfo?.data;

  const { data: chapterInfo } = useGetSingleAcademyChapterQuery(chapterId);
  const chapter = chapterInfo?.data;

  const { data: tagInfo } = useGetTagQuery(tagId);
  const tag = tagInfo?.data;

  const { data: setInfo } = useGetSingleAdmissionQuestionSetQuery(setId);
  const set = setInfo?.data;

  let query = {};
  query["cls"] = classId;
  query["subject"] = subjectId;
  query["chapter"] = chapterId;
  query["tag"] = tagId;
  query["set"] = setId;
  query["page"] = currentPage;
  query["limit"] = 10;
  const { data: mcq } = useGetAcademyMCQQuery({ ...query });
  const mcqs = mcq?.data;

  const [examInfoModal, setExamInfoModal] = useState(false);

  return (
    <div>
      <section className="grid md:grid-cols-3 items-start gap-6">
        <div className="md:col-span-2 rounded overflow-hidden">
          <div className="bg-primary text-base-100 text-center py-4">
            <h2 className="sm:text-xl font-medium">
              {chapterId
                ? chapter?.name
                : subjectId
                ? subject?.name
                : classId
                ? cls?.name
                : tagId
                ? tag?.name
                : setId
                ? set?.name
                : "All MCQ"}
            </h2>
            <p className="text-sm">All Question - ({mcq?.meta?.total})</p>
          </div>

          <div className="p-4 bg-base-100">
            <ul className="flex items-center justify-center gap-2 text-xs text-base-100">
              <li>
                <Link
                  to={`${
                    subjectId
                      ? `/academy/subject-${subjectId}/chapters`
                      : chapterId && `/academy/chapter-${chapterId}/content`
                  }`}
                  className="bg-primary px-4 py-2 rounded"
                >
                  Read
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setExamInfoModal(true)}
                  className="bg-rose-700 px-4 py-2 rounded"
                >
                  Test
                </button>

                {/* model */}
                <ExamInfoModal
                  examInfoModal={examInfoModal}
                  setExamInfoModal={setExamInfoModal}
                  length={mcq?.meta?.total}
                />
              </li>
              <li>
                <Link
                  to={`${
                    subjectId
                      ? `/academy/written?subject=${subjectId}`
                      : chapterId && `/academy/written?chapter=${chapterId}`
                  }`}
                  className="bg-sky-500 px-4 py-2 rounded"
                >
                  Written
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {mcqs?.map((mcq, i) => (
              <Mcq
                key={mcq?._id}
                mcq={mcq}
                i={i}
                page={currentPage}
                limit={10}
              />
            ))}
          </div>

          <Pagination
            pages={mcq?.meta?.pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <div>
          <div className="h-40 bg-primary/10 rounded"></div>
          <br />
          <div className="h-40 bg-secondary/10 rounded"></div>
        </div>
      </section>
    </div>
  );
}
