import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import perser from "html-react-parser";
import {
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
  MdDateRange,
} from "react-icons/md";
import {
  FaBookmark,
  FaQuestion,
  FaMinusCircle,
  FaAward,
  FaPercent,
} from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { GrCheckboxSelected } from "react-icons/gr";
import ModelTestSubmitModal from "./ModelTestSubmitModal";
import ModelTestSkeleton from "../../../../Components/Skeleton/ModelTestSkeleton";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAddModelTestAttendMutation } from "../../../../Redux/api/modelTestAttendApi";
import { useGetSingleModelTestQuery } from "../../../../Redux/api/modelTestApi";

export default function JobTestAttend() {
  let { id } = useParams();
  let navigate = useNavigate();
  const { loggedUser } = useSelector((store) => store.user);

  const { data, isLoading } = useGetSingleModelTestQuery(id);
  let modelTest = data?.data;

  let duration = modelTest?.duration;
  let mcqs = modelTest?.mcqs;
  let totalQuestion = modelTest?.mcqs?.length;
  let totalMark = modelTest?.totalMark;
  let passMark = modelTest?.passMark;
  let negativeMark = modelTest?.negativeMark;

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [time, setTime] = useState(duration * 60);
  const [examQuetion, setExamQuestion] = useState([]);
  const [exitTimeModal, setExitTimeModal] = useState(false);

  useEffect(() => {
    const allMcqs = mcqs?.map((mcq) => ({
      mcq: mcq?._id,
      rightAns: mcq?.ans,
    }));
    setExamQuestion(allMcqs);
  }, [mcqs]);

  useEffect(() => {
    if (duration) {
      setTime(duration * 60);
    }
  }, [duration]);

  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return `${day}-${month}-${year}`;
  };
  const date = new Date();
  const today = formatDate(date);

  const handleSetAns = (mcqId, point) => {
    const updatedArray = examQuetion?.map((item) =>
      item?.mcq == mcqId ? { ...item, selectedAns: point?.name } : item
    );

    setExamQuestion(updatedArray);

    setSelectedAnswers({
      ...selectedAnswers,
      [mcqId]: point?.name,
    });
  };

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  let keys = Object.keys(selectedAnswers);
  let length = keys?.length;

  const completed = (100 / totalQuestion) * parseInt(length);
  useEffect(() => {
    if (time <= 0) {
      setExitTimeModal(true);
    }
  }, [time]);

  const [addModelTestAttend, { isLoading: addLoading }] =
    useAddModelTestAttendMutation();

  //----------Handle Submite
  const handleExamSubmit = async () => {
    const totalRight = examQuetion.filter(
      (question) =>
        question?.selectedAns && question?.rightAns == question?.selectedAns
    );
    const totalWrong = examQuetion.filter(
      (question) =>
        question?.selectedAns && question?.rightAns != question?.selectedAns
    );

    const noAns = examQuetion.filter((question) => !question?.selectedAns);

    const totalRightAns = totalRight?.length;
    const totalWrongAns = totalWrong?.length;
    const totalNoAns = noAns?.length;
    const singleQuestionMark = totalMark / totalQuestion;
    const totalNegativeMark = negativeMark * totalWrongAns;
    const obtainMark = totalRightAns * singleQuestionMark - totalNegativeMark;
    const resultType = obtainMark >= passMark ? "PASS" : "Fail";

    const info = {
      user: loggedUser?.data?._id,
      modelTest: id,
      modelTestType: "JobModelTest",
      mcqs: examQuetion,
      result: {
        obtainMark,
        resultType,
        totalRightAns,
        totalWrongAns,
        totalNoAns,
        totalNegativeMark,
      },
    };

    let res = await addModelTestAttend(info);
    if (res?.data?.success) {
      toast.success("Model test submit success");
      navigate("/exam/result/modeltest?category=job");
      setTime(0);
    } else {
      toast.error("something went wrong!");
      console.log(res);
    }
  };

  if (isLoading) return <ModelTestSkeleton />;

  return (
    <>
      <section>
        <div className="shadow rounded overflow-hidden bg-base-100">
          <div className="bg-primary text-base-100 p-4 flex justify-between items-center">
            <h2 className="text-lg font-medium">Model Test</h2>

            <div className="text-secondary">{formatTime(time)}</div>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-[13px] lg:w-[90%] mx-auto">
            <div className="flex items-center gap-2">
              <div className="bg-primary/80 text-base-100 p-2 rounded">
                <FaQuestion />
              </div>
              <div>
                <p>{totalQuestion}</p>
                <p className="text-neutral-content">TOTAL QUESTION</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-primary/80 text-base-100 p-2 rounded">
                <FaBookmark />
              </div>
              <div>
                <p>{totalMark}</p>
                <p className="text-neutral-content">TOTAL MARK</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-primary/80 text-base-100 p-2 rounded">
                <FaAward />
              </div>
              <div>
                <p>{passMark}</p>
                <p className="text-neutral-content">PASS MARK</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-primary/80 text-base-100 p-2 rounded">
                <IoIosTime />
              </div>
              <div>
                <p>{duration} min.</p>
                <p className="text-neutral-content">DURATION</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-secondary/80 text-base-100 p-2 rounded">
                <FaMinusCircle />
              </div>
              <div>
                <p>{negativeMark}</p>
                <p className="text-neutral-content">NEGATIVE MARK</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-primary/80 text-base-100 p-2 rounded">
                <MdDateRange />
              </div>
              <div>
                <p>{today}</p>
                <p className="text-neutral-content">EXAM DATE</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-primary/80 text-base-100 p-2 rounded">
                <GrCheckboxSelected />
              </div>
              <div>
                <p>
                  {keys?.length ? keys?.length : 0}/{totalQuestion}
                </p>
                <p className="text-neutral-content">SELECTED QUESTION</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-primary/80 text-base-100 p-2 rounded">
                <FaPercent />
              </div>
              <div>
                <p>{parseInt(completed)}%</p>
                <p className="text-neutral-content">COMPLETED</p>
              </div>
            </div>
          </div>
        </div>
        {/* Questions */}
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          {mcqs?.map((mcq, i) => (
            <div
              className="shadow bg-base-100 rounded overflow-hidden"
              key={mcq?._id}
            >
              <h2 className="bg-primary/20 font-medium p-3 flex items-start gap-1">
                {i + 1}. {mcq?.question && perser(mcq?.question)}
              </h2>

              <div className="p-3 grid grid-cols-2 gap-2 text-[15px]">
                {mcq?.points?.map((point, i) => (
                  <button
                    onClick={() => handleSetAns(mcq?._id, point)}
                    key={i}
                    className="flex items-center gap-2 w-max"
                    disabled={selectedAnswers[mcq?._id] !== undefined}
                  >
                    {selectedAnswers[mcq?._id] === point?.name ? (
                      <MdRadioButtonChecked />
                    ) : (
                      <MdRadioButtonUnchecked />
                    )}

                    <span>{perser(point?.title)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="fixed right-4 bottom-4 z-40">
            <button
              disabled={addLoading && "disabled"}
              onClick={handleExamSubmit}
              className="primary_btn"
            >
              {addLoading ? (
                "Loading..."
              ) : (
                <>
                  Submit{" "}
                  <small>
                    {keys?.length ? keys?.length : 0}/{totalQuestion}
                  </small>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {exitTimeModal && (
        <ModelTestSubmitModal
          exitTimeModal={exitTimeModal}
          setExitTimeModal={setExitTimeModal}
          category="academy"
        />
      )}
    </>
  );
}
