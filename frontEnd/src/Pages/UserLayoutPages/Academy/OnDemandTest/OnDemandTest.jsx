import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import perser from "html-react-parser";

import { FaQuestion } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";

import { useGetAcademyMCQQuery } from "../../../../Redux/api/academy/mcqApi";
import { useAddAcademyModelTestMutation } from "../../../../Redux/api/academy/modeltestApi";

import ExitTimeModal from "./ExitTimeModal";
import { useSelector } from "react-redux";

export default function OnDemandTest() {
  const navigate = useNavigate();

  const { loggedUser } = useSelector((store) => store?.user);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const subjectId = queryParams.get("subject");

  let query = {};
  query["subject"] = subjectId;
  const { data: mcq } = useGetAcademyMCQQuery({ ...query });
  const mcqs = mcq?.data;

  const totalQuestion = queryParams.get("nq");
  const totalMark = queryParams.get("tm");
  const passMark = queryParams.get("pm");
  const examDuration = queryParams.get("ed");
  const negativeMark = queryParams.get("nm");

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

  const [randomMcq, setRandomMcq] = useState([]);
  useEffect(() => {
    if (mcqs?.length) {
      let copiedArray = [...mcqs];
      for (let i = copiedArray?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
      }

      const randomElements = copiedArray.slice(0, totalQuestion);
      setRandomMcq(randomElements);
    }
  }, [mcqs, totalQuestion]);

  const [examQuetion, setExamQuestion] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const allExamQuestion = randomMcq?.map((mcq) => ({
      mcq: mcq?._id,
      rightAns: mcq?.ans,
    }));
    setExamQuestion(allExamQuestion);
  }, [randomMcq]);

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

  const [time, setTime] = useState(examDuration * 60);

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

  const [addAcademyModelTest, { isLoading }] = useAddAcademyModelTestMutation();

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

    const examInfo = {
      user: loggedUser?.data?._id,
      totalQuestion,
      totalMark,
      passMark,
      examDuration,
      negativeMark,
      date: today,
      mcqs: examQuetion,
      result: {
        obtainMark,
        resultType,
        totalRightAns,
        totalWrongAns,
        totalNoAns,
        totalNegativeMark,
      },
      subject: subjectId,
    };

    const res = await addAcademyModelTest(examInfo);
    if (res?.data?.success) {
      Swal.fire("", "Exam successfully submitted", "success");
      navigate("/exam/result/ondemandtest");
    } else {
      Swal.fire("", "something went wrong", "error");
      console.log(res);
    }

    setTime(0);
    setExitTimeModal(false);
  };

  const [exitTimeModal, setExitTimeModal] = useState(false);

  useEffect(() => {
    if (time <= 0) {
      setExitTimeModal(true);
    }
  }, [time]);

  return (
    <>
      <section>
        <div className="shadow rounded overflow-hidden bg-base-100">
          <div className="bg-primary text-base-100 p-4 flex justify-between items-center">
            <h2 className="text-lg font-medium">On Demand Test</h2>

            <div className="text-base-100">{formatTime(time)}</div>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-[13px] lg:w-2/3 mx-auto">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-base-100 p-2 rounded">
                <FaQuestion />
              </div>
              <div>
                <p>{totalQuestion}</p>
                <p className="text-neutral-content">TOTAL QUESTION</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-secondary text-base-100 p-2 rounded">
                <FaBookmark />
              </div>
              <div>
                <p>{totalMark}</p>
                <p className="text-neutral-content">TOTAL MARK</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-secondary text-base-100 p-2 rounded">
                <FaBookmark />
              </div>
              <div>
                <p>{passMark}</p>
                <p className="text-neutral-content">PASS MARK</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-secondary text-base-100 p-2 rounded">
                <FaBookmark />
              </div>
              <div>
                <p>{examDuration} min.</p>
                <p className="text-neutral-content">DURATION</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-secondary text-base-100 p-2 rounded">
                <FaBookmark />
              </div>
              <div>
                <p>{negativeMark}</p>
                <p className="text-neutral-content">NEGATIVE MARK</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-secondary text-base-100 p-2 rounded">
                <FaBookmark />
              </div>
              <div>
                <p>{today}</p>
                <p className="text-neutral-content">EXAM DATE</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-secondary text-base-100 p-2 rounded">
                <FaBookmark />
              </div>
              <div>
                <p>
                  {keys?.length ? keys?.length : 0}/{totalQuestion}
                </p>
                <p className="text-neutral-content">SELECTED QUESTION</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-secondary text-base-100 p-2 rounded">
                <FaBookmark />
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
          {randomMcq?.map((mcq, i) => (
            <div
              className="shadow bg-base-100 rounded overflow-hidden"
              key={mcq?._id}
            >
              <h2 className="bg-secondary/20 font-medium p-3 flex items-start gap-1">
                {i + 1}. {perser(mcq?.question)}
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
          <button
            disabled={isLoading && "disabled"}
            onClick={handleExamSubmit}
            className="secondary_btn"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </section>

      {exitTimeModal && (
        <ExitTimeModal
          exitTimeModal={exitTimeModal}
          setExitTimeModal={setExitTimeModal}
          subjectId={subjectId}
          handleExamSubmit={handleExamSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
