import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaAward, FaBookmark, FaQuestion, FaCheck } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdInfo, MdClose, MdDoNotDisturbOn } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { IoBookmarks } from "react-icons/io5";
import { useGetModelTestAttendQuery } from "../../../../../Redux/api/academy/academyModelTestAttendApi";
import { useGetAdmissionMTAttendQuery } from "../../../../../Redux/api/admission/admissionModelTestAttendApi";
import { useSelector } from "react-redux";
import Pagination from "../../../../../Components/Pagination/Pagination";
import { useGetJobModelTestAttendQuery } from "../../../../../Redux/api/job/jobModelTestAttendApi";

export default function ModelTest({ category }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const { loggedUser } = useSelector((store) => store?.user);

  let limit = 10;
  const [currentPage, setCurrentPage] = useState(1);

  let query = {};
  query["user"] = loggedUser?.data?._id;
  query["limit"] = limit;
  query["page"] = currentPage;
  const { data: academy, isLoading } = useGetModelTestAttendQuery({ ...query });
  const { data: admission, isLoading: admissionLoading } =
    useGetAdmissionMTAttendQuery({ ...query });

  const { data: job, isLoading: jobLoading } = useGetJobModelTestAttendQuery({
    ...query,
  });

  const [modelTest, setModelTest] = useState([]);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    if (category == "academy") {
      setModelTest(academy?.data);
      setMeta(academy?.meta);
    } else if (category == "admission") {
      setModelTest(admission?.data);
      setMeta(admission?.meta);
    } else if (category == "job") {
      setModelTest(job?.data);
      setMeta(job?.meta);
    }
  }, [category, academy, admission, job]);
  if (isLoading || admissionLoading || jobLoading)
    return (
      <div className="mt-3 grid sm:grid-cols-2 gap-2">
        <div className="bg-base-100 h-20 rounded"></div>
        <div className="bg-base-100 h-20 rounded"></div>
        <div className="bg-base-100 h-20 rounded"></div>
        <div className="bg-base-100 h-20 rounded"></div>
        <div className="bg-base-100 h-20 rounded"></div>
        <div className="bg-base-100 h-20 rounded"></div>
        <div className="bg-base-100 h-20 rounded"></div>
        <div className="bg-base-100 h-20 rounded"></div>
      </div>
    );

  return (
    <div>
      <div className="mt-2 grid md:grid-cols-2 items-start gap-4">
        {modelTest?.map((test) => (
          <div
            key={test?._id}
            className="bg-base-100 rounded overflow-hidden shadow border border-primary"
          >
            <div className="bg-gray-100 text-neutral p-4 py-3 flex justify-between items-center">
              <div>
                <h2 className="font-medium">
                  Model Test <small className="pl-1">{category}</small>
                </h2>
                <p className="text-xs text-neutral-content">
                  Time: {moment(test?.createdAt).fromNow()}
                </p>
              </div>
              <button
                onClick={() => {
                  setOpen(!open);
                  setActive(test?._id);
                }}
              >
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div
              className={`${
                open && active == test?._id ? "h-max" : "h-0 overflow-hidden"
              } duration-300`}
            >
              <div className="p-4 grid grid-cols-2 gap-3 text-[13px]">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/80 text-base-100 p-2 rounded">
                    <FaQuestion />
                  </div>
                  <div>
                    <p>{test?.modelTest?.mcqs?.length}</p>
                    <p className="text-neutral-content text-xs">
                      TOTAL QUESTION
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-primary/80 text-base-100 p-2 rounded">
                    <IoBookmarks />
                  </div>
                  <div>
                    <p>{test?.modelTest?.totalMark}</p>
                    <p className="text-neutral-content text-xs">TOTAL MARK</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-primary/80 text-base-100 p-2 rounded">
                    <FaListCheck />
                  </div>
                  <div>
                    <p>
                      {test?.result?.totalRightAns +
                        test?.result?.totalWrongAns}
                    </p>
                    <p className="text-neutral-content text-xs">ANSWERED</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-primary/80 text-base-100 p-2 rounded">
                    <FaCheck />
                  </div>
                  <div>
                    <p>{test?.result?.totalRightAns}</p>
                    <p className="text-neutral-content text-xs">RIGHT ANSWER</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-secondary/80 text-base-100 p-2 rounded">
                    <MdClose />
                  </div>
                  <div>
                    <p>{test?.result?.totalWrongAns}</p>
                    <p className="text-neutral-content text-xs">WRONG ANSWER</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-primary/80 text-base-100 p-2 rounded">
                    <FaAward />
                  </div>
                  <div>
                    <p>{test?.result?.obtainMark}</p>
                    <p className="text-neutral-content text-xs">OBTAIN MARK</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-primary/80 text-base-100 p-2 rounded">
                    <FaBookmark />
                  </div>
                  <div>
                    <p>{test?.modelTest?.passMark}</p>
                    <p className="text-neutral-content text-xs">PASS MARK</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-secondary/80 text-base-100 p-2 rounded">
                    <MdDoNotDisturbOn />
                  </div>
                  <div>
                    <p>- {test?.result?.totalNegativeMark}</p>
                    <p className="text-neutral-content text-xs">
                      NEGATIVE MARK
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t px-3 py-2 flex justify-between items-center text-xs uppercase text-base-100">
                <div>
                  {test?.result?.resultType == "PASS" ? (
                    <span className="bg-primary px-2 py-1 rounded">Passes</span>
                  ) : (
                    <span className="bg-red-500 px-2 py-1 rounded">Failed</span>
                  )}
                </div>

                <Link
                  to={`/exam-result/modeltest?exam=${test?._id}&category=${category}`}
                  className="bg-gray-300 text-neutral px-2 py-1 rounded flex items-center gap-1"
                >
                  <MdInfo className="text-[15px]" /> Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        pages={meta?.pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
