/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import Spinner from "../Components/Loader/Spinner/Spinner.jsx";
import PackageCheckout from "../Pages/UserLayoutPages/PackageCheckout/PackageCheckout.jsx";
import Subscription from "../Pages/UserLayoutPages/Profile/Subscription/Subscription.jsx";
import AddModelTest from "../Pages/UserLayoutPages/Exam/AddModelTest/AddModelTest.jsx";
import ModelTestResult from "../Pages/UserLayoutPages/Exam/ExamResult/ModelTestResult.jsx";
import OnDemandTestResult from "../Pages/UserLayoutPages/Exam/ExamResult/OnDemandTestResult.jsx";
import BoardExamResult from "../Pages/UserLayoutPages/Exam/ExamResult/BoardExamResult.jsx";
import ExamDetails from "../Pages/UserLayoutPages/Exam/ExamDetails/ExamDetails.jsx";
import MainRootLayout from "../Layout/MainRootLayout.jsx";

const ProfileLayout = lazy(() => import("../Layout/ProfileLayout"));
const UserLayout = lazy(() => import("../Layout/UserLayout"));
const Overview = lazy(() =>
  import("../Pages/UserLayoutPages/Profile/Overview/Overview")
);
const Setting = lazy(() =>
  import("../Pages/UserLayoutPages/Profile/Setting/Setting")
);
const PrivateRoute = lazy(() => import("../PrivateRoute/PrivateRoute"));
const CurrentAffairsU = lazy(() =>
  import("../Pages/UserLayoutPages/CurrentAffairs/CurrentAffairs.jsx")
);
const CurrentAffairsDetails = lazy(() =>
  import(
    "../Pages/UserLayoutPages/CurrentAffairsDetails/CurrentAffairsDetails.jsx"
  )
);
const BoardExamResultDetails = lazy(() =>
  import(
    "../Pages/UserLayoutPages/Exam/ExamResultDetails/BoardExamResultDetails.jsx"
  )
);

const ExamResultDetails = lazy(() =>
  import("../Pages/UserLayoutPages/Exam/ExamResultDetails/ExamResultDetails")
);
const QuestionBankDetails = lazy(() =>
  import(
    "../Pages/UserLayoutPages/Admission/QuestionBankDetails/QuestionBankDetails"
  )
);
const ExamList = lazy(() =>
  import("../Pages/UserLayoutPages/Exam/ExamList/ExamList")
);
// const AcademyExamDetails = lazy(() =>
//   import("../Pages/UserLayoutPages/Exam/ExamDetails/ExamDetails.jsx")
// );

const AcademyTestAttend = lazy(() =>
  import("../Pages/UserLayoutPages/Exam/ModelTestAttend/AcademyTestAttend")
);
const AdmissionTestAttend = lazy(() =>
  import("../Pages/UserLayoutPages/Exam/ModelTestAttend/AdmissionTestAttend")
);
const ModelTestDetails = lazy(() =>
  import("../Pages/UserLayoutPages/Exam/ExamResultDetails/ModelTestDetails")
);
const Faqs = lazy(() => import("../Pages/UserLayoutPages/Faq/Faqs"));
const Feedbacks = lazy(() =>
  import("../Pages/UserLayoutPages/Feedback/Feedbacks")
);
const PackagesU = lazy(() =>
  import("../Pages/UserLayoutPages/PackagesU/PackagesU")
);

const AskQuestion = lazy(() =>
  import("../Pages/UserLayoutPages/AskQuestion/AskQuestion")
);
const AskQuestionDetails = lazy(() =>
  import("../Pages/UserLayoutPages/AskQuestionDetails/AskQuestionDetails")
);
const AddAskQuestionPage = lazy(() =>
  import("../Pages/UserLayoutPages/AskQuestion/AddAskQuestionPage")
);

const EditAskQuestionPage = lazy(() =>
  import("../Pages/UserLayoutPages/AskQuestion/EditAskQuestionPage.jsx")
);
const HandNotes = lazy(() =>
  import("../Pages/UserLayoutPages/HandNote/HandNotes.jsx")
);
const AddHandNotePage = lazy(() =>
  import("../Pages/UserLayoutPages/HandNote/AddHandNotePage.jsx")
);
const EditHandNotePage = lazy(() =>
  import("../Pages/UserLayoutPages/HandNote/EditHandNotePage.jsx")
);
const HandNoteDetails = lazy(() =>
  import("../Pages/UserLayoutPages/HandNoteDetails/HandNoteDetails.jsx")
);
const Notices = lazy(() =>
  import("../Pages/UserLayoutPages/Notice/Notices.jsx")
);
const AddNoticesPage = lazy(() =>
  import("../Pages/UserLayoutPages/Notice/AddNoticesPage.jsx")
);
const EditNoticesPage = lazy(() =>
  import("../Pages/UserLayoutPages/Notice/EditNoticesPage.jsx")
);
const NoticeDetails = lazy(() =>
  import("../Pages/UserLayoutPages/NoticeDetails/NoticeDetails.jsx")
);
const Job = lazy(() => import("../Pages/UserLayoutPages/Job/Job.jsx"));
const JobQuesSetDetails = lazy(() =>
  import("../Pages/UserLayoutPages/Job/JobQuesSetDetails/JobQuesSetDetails.jsx")
);

const JobTestAttend = lazy(() =>
  import("../Pages/UserLayoutPages/Exam/ModelTestAttend/JobTestAttend.jsx")
);

const BoardMcqF = lazy(() =>
  import("../Pages/UserLayoutPages/Academy/BoardExam/BoardMcq/BoardMcq")
);

const BoardMcqExamAttend = lazy(() =>
  import("../Pages/UserLayoutPages/Academy/BoardExam/BoardMcq/BoardMcqExam.jsx")
);

const BoardWrittenF = lazy(() =>
  import("../Pages/UserLayoutPages/Academy/BoardExam/BoardWritten/BoardWritten")
);

const BoardMcqDetails = lazy(() =>
  import(
    "../Pages/UserLayoutPages/Academy/BoardExam/BoardMcq/BoardMcqDetails.jsx"
  )
);
const BoardWrittenDetails = lazy(() =>
  import(
    "../Pages/UserLayoutPages/Academy/BoardExam/BoardWritten/BoardWrittenDetails"
  )
);

const Academy = lazy(() => import("../Pages/UserLayoutPages/Academy/Academy"));
const SubjectsF = lazy(() =>
  import("../Pages/UserLayoutPages/Academy/SubjectsF/SubjectsF")
);
const ChaptersF = lazy(() =>
  import("../Pages/UserLayoutPages/Academy/ChaptersF/ChaptersF")
);
const Content = lazy(() =>
  import("../Pages/UserLayoutPages/Academy/Content/Content")
);

const McqF = lazy(() => import("../Pages/UserLayoutPages/Academy/McqF/McqF"));
const McqDetails = lazy(() =>
  import("../Pages/UserLayoutPages/Academy/McqDetails/McqDetails")
);

const WrittenF = lazy(() =>
  import("../Pages/UserLayoutPages/Academy/WrittenF/WrittenF")
);

const OnDemandTest = lazy(() =>
  import("../Pages/UserLayoutPages/Academy/OnDemandTest/OnDemandTest")
);

//----------------------------Exam

//-------------------Admission
const Admission = lazy(() =>
  import("../Pages/UserLayoutPages/Admission/Admission/Admission")
);

export const userRoutes = {
  path: "/",
  element: <MainRootLayout />,
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<Spinner />}>
          <UserLayout />
        </Suspense>
      ),
      children: [
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <ProfileLayout />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/profile",
              element: <Overview />,
            },
            {
              path: "/profile/setting",
              element: <Setting />,
            },
            {
              path: "/profile/subscription",
              element: <Subscription />,
            },
          ],
        },
        {
          path: "/academy",
          element: <Academy />,
        },
        {
          path: "/academy/:classId/subjects",
          element: <SubjectsF />,
        },
        {
          path: "academy/:subjectId/chapters",
          element: <ChaptersF />,
        },
        {
          path: "academy/:chapterId/content",
          element: <Content />,
        },
        {
          path: "academy/board-exam/mcq",
          element: <BoardMcqF />,
        },
        {
          path: "academy/board-exam/mcqExam/:id",
          element: <BoardMcqExamAttend />,
        },
        {
          path: "academy/board-exam/written",
          element: <BoardWrittenF />,
        },
        {
          path: "academy/board-exam/mcq/:id",
          element: <BoardMcqDetails />,
        },
        {
          path: "academy/board-exam/written/:id",
          element: <BoardWrittenDetails />,
        },
        {
          path: "academy/mcq",
          element: <McqF />,
        },
        {
          path: "academy/mcq/:id",
          element: <McqDetails />,
        },
        {
          path: "academy/written",
          element: <WrittenF />,
        },
        {
          path: "academy/test",
          element: <OnDemandTest />,
        },
        {
          path: "admission",
          element: <Admission />,
        },
        {
          path: "admission/question-bank/:id",
          element: <QuestionBankDetails />,
        },
        {
          path: "job-assistant",
          element: <Job />,
        },
        {
          path: "job-assistant/question-bank/:id",
          element: <JobQuesSetDetails />,
        },
        {
          path: "exam-list",
          element: <ExamList />,
        },
        {
          path: "/modeltest/add",
          element: (
            <PrivateRoute>
              <AddModelTest />
            </PrivateRoute>
          ),
        },
        {
          path: "exam/modeltest/:id",
          element: <ExamDetails />,
        },

        {
          path: "job/model-test/attend/:id",
          element: <JobTestAttend />,
        },
        {
          path: "academy/model-test/attend/:id",
          element: <AcademyTestAttend />,
        },
        {
          path: "admission/model-test/attend/:id",
          element: <AdmissionTestAttend />,
        },

        //-------------Result
        {
          path: "exam/result/ondemandtest",
          element: <OnDemandTestResult />,
        },
        {
          path: "exam/result/modeltest",
          element: <ModelTestResult />,
        },
        {
          path: "exam/result/boardexam",
          element: <BoardExamResult />,
        },

        // {
        //   path: "exam-result",
        //   element: <ExamResult />,
        // },

        {
          path: "exam-result/details/ondemandtest/:id",
          element: <ExamResultDetails />,
        },
        {
          path: "exam-result/details/modeltest/:id",
          element: <ModelTestDetails />,
        },
        {
          path: "exam-result/details/boardexam/:id",
          element: <BoardExamResultDetails />,
        },

        {
          path: "faqs",
          element: <Faqs />,
        },
        {
          path: "feedback",
          element: <Feedbacks />,
        },
        {
          path: "packages",
          element: <PackagesU />,
        },
        {
          path: "package/checkout/:id",
          element: (
            <PrivateRoute>
              <PackageCheckout />
            </PrivateRoute>
          ),
        },
        {
          path: "current-affairs",
          element: <CurrentAffairsU />,
        },
        {
          path: "current-affairs/:id",
          element: <CurrentAffairsDetails />,
        },
        {
          path: "discussions",
          element: <AskQuestion />,
        },
        {
          path: "discussion/:id",
          element: <AskQuestionDetails />,
        },
        {
          path: "ask-question/add",
          element: (
            <PrivateRoute>
              <AddAskQuestionPage />
            </PrivateRoute>
          ),
        },
        {
          path: "ask-question/edit/:id",
          element: (
            <PrivateRoute>
              <EditAskQuestionPage />
            </PrivateRoute>
          ),
        },
        {
          path: "handnotes",
          element: <HandNotes />,
        },
        {
          path: "handnotes/:id",
          element: <HandNoteDetails />,
        },
        {
          path: "handnote/add",
          element: (
            <PrivateRoute>
              <AddHandNotePage />
            </PrivateRoute>
          ),
        },
        {
          path: "handnote/edit/:id",
          element: (
            <PrivateRoute>
              <EditHandNotePage />
            </PrivateRoute>
          ),
        },
        {
          path: "notices",
          element: <Notices />,
        },
        {
          path: "notices/:id",
          element: <NoticeDetails />,
        },
        {
          path: "notices/add",
          element: (
            <PrivateRoute>
              <AddNoticesPage />
            </PrivateRoute>
          ),
        },
        {
          path: "notices/edit/:id",
          element: (
            <PrivateRoute>
              <EditNoticesPage />
            </PrivateRoute>
          ),
        },
      ],
    },
  ],
};
