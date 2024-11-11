import QuestionCountdown from "/src/assets/images/banner/question_countdown.png";
import StudentCountdown from "/src/assets/images/banner/student_countdown.png";
import ExamCountdown from "/src/assets/images/banner/exam_countdown.png";
import { useGetBannerQuery } from "../../../Redux/api/bannerApi";
import { useGetAcademyMCQQuery } from "../../../Redux/api/academy/mcqApi";
import { useGetAcademyWrittenQuery } from "../../../Redux/api/academy/writtenApi";
import { useGetAllUsersOnlyQuery } from "../../../Redux/api/user/userApi";
import { useGetModelTestQuery } from "../../../Redux/api/modelTestApi";

export default function Hero() {
  const { data, isLoading } = useGetBannerQuery();
  const banner = data?.data;

  const { data: mcq } = useGetAcademyMCQQuery();
  const { data: written } = useGetAcademyWrittenQuery();

  const { data: user } = useGetAllUsersOnlyQuery();

  const { data: modeltest } = useGetModelTestQuery();

  const totalMcq = mcq?.data?.length;
  const totalWritten = written?.data?.length;

  const totalExam = modeltest?.data?.length;

  if (isLoading)
    return <div className="w-full h-[40vh] md:h-[60vh] bg-black/90"></div>;

  return (
    <div className="h-[40vh] md:h-[60vh]">
      <div className="relative h-full">
        {/* bg */}
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/banner/${banner?.bg}`}
          alt=""
          className="absolute w-full h-full"
          loading="lazy"
        />

        {/* Content */}
        <div className="w-full h-full flex flex-col justify-center items-center relative z-30 bg-[#000000b1]">
          <div className="mt-10 flex flex-col items-center justify-center sm:gap-3">
            <h3 className="text-2xl md:text-4xl font-bold text-base-100">
              {banner?.title}
            </h3>
            <h2 className="md:text-xl text-base-100/70">{banner?.subTitle}</h2>
          </div>

          {/* Counter */}
          <div className="md:mt-10 w-[90%] lg:w-1/2 bg-primary/5 rounded-lg mx-auto py-6 md:py-10 px-2 md:px-4 grid grid-cols-3 gap-6">
            <div className="border-r border-primary/40 flex items-center justify-center gap-1 md:gap-3">
              <img
                src={QuestionCountdown}
                alt=""
                className="w-7 h-7 md:w-10 md:h-9 rounded-full"
              />
              <div>
                <h2 className="md:text-xl font-bold text-base-100">
                  {totalMcq + totalWritten >= 1000
                    ? (totalMcq + totalWritten / 1000).toFixed(1) + "K"
                    : totalMcq + totalWritten}
                  +
                </h2>
                <h3 className="text-xs md:text-sm text-base-100/40">প্রশ্ন</h3>
              </div>
            </div>
            <div className="border-r border-primary/40 flex items-center justify-center gap-1 md:gap-3">
              <img
                src={StudentCountdown}
                alt="Student Countdown"
                className="w-7 h-7 md:w-10 md:h-9 rounded-full"
              />
              <div>
                <h2 className="md:text-xl font-bold text-base-100">
                  {user?.data?.length}+
                </h2>
                <h3 className="text-xs md:text-sm text-base-100/40">
                  শিক্ষার্থী
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 md:gap-3">
              <img
                src={ExamCountdown}
                alt="Exam Countdown"
                className="w-7 h-7 md:w-10 md:h-9 rounded-full"
              />
              <div>
                <h2 className="md:text-xl font-bold text-base-100">
                  {totalExam >= 1000
                    ? (totalExam / 1000).toFixed(1) + "K"
                    : totalExam}
                  +
                </h2>
                <h3 className="text-xs md:text-sm text-base-100/40">মডেল</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
