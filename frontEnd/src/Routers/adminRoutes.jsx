/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import Spinner from "../Components/Loader/Spinner/Spinner.jsx";

const AdminRoute = lazy(() => import("../PrivateRoute/AdminRoute.jsx"));
const AdminLayout = lazy(() => import("../Layout/AdminLayout"));
const Dashboard = lazy(() => import("../Pages/Admin/Dashboard/Dashboard"));

const Categories = lazy(() =>
  import("../Pages/Admin/Academy/Category/Categories")
);
const AddCategory = lazy(() =>
  import("../Pages/Admin/Academy/Category/AddCategory")
);
const EditCategory = lazy(() =>
  import("../Pages/Admin/Academy/Category/EditCategory")
);

const Classes = lazy(() => import("../Pages/Admin/Academy/Class/Classes"));
const AddClass = lazy(() => import("../Pages/Admin/Academy/Class/AddClass"));
const EditClass = lazy(() => import("../Pages/Admin/Academy/Class/EditClass"));

const Subject = lazy(() => import("../Pages/Admin/Academy/Subject/Subject"));
const AddSubject = lazy(() =>
  import("../Pages/Admin/Academy/Subject/AddSubject")
);
const EditSubject = lazy(() =>
  import("../Pages/Admin/Academy/Subject/EditSubject")
);

const Chapters = lazy(() => import("../Pages/Admin/Academy/Chapter/Chapters"));
const AddChapter = lazy(() =>
  import("../Pages/Admin/Academy/Chapter/AddChapter")
);
const EditChapter = lazy(() =>
  import("../Pages/Admin/Academy/Chapter/EditChapter")
);

const Contents = lazy(() => import("../Pages/Admin/Academy/Content/Contents"));
const AddContent = lazy(() =>
  import("../Pages/Admin/Academy/Content/AddContent")
);
const EditContent = lazy(() =>
  import("../Pages/Admin/Academy/Content/EditContent")
);

const MCQ = lazy(() => import("../Pages/Admin/Academy/MCQ/MCQ"));
const AddMCQ = lazy(() => import("../Pages/Admin/Academy/MCQ/AddMCQ"));
const EditMCQ = lazy(() => import("../Pages/Admin/Academy/MCQ/EditMCQ"));

const Writtens = lazy(() => import("../Pages/Admin/Academy/Written/Writtens"));
const AddWritten = lazy(() =>
  import("../Pages/Admin/Academy/Written/AddWritten")
);
const EditWritten = lazy(() =>
  import("../Pages/Admin/Academy/Written/EditWritten")
);

//----------------------------------Admission
const Universities = lazy(() =>
  import("../Pages/Admin/Admission/Universities/Universities")
);
const AddUniversity = lazy(() =>
  import("../Pages/Admin/Admission/Universities/AddUniversity")
);
const EditUniversity = lazy(() =>
  import("../Pages/Admin/Admission/Universities/EditUniversity")
);

// Question set
const QuestionSet = lazy(() =>
  import("../Pages/Admin/Admission/QuestionSet/QuestionSet")
);
const AddQuestionSet = lazy(() =>
  import("../Pages/Admin/Admission/QuestionSet/AddQuestionSet/AddQuestionSet")
);
const EditQuestionSet = lazy(() =>
  import("../Pages/Admin/Admission/QuestionSet/EditQuestionSet/EditQuestionSet")
);

const AdmissionMCQ = lazy(() =>
  import("../Pages/Admin/Admission/AdmissionMCQ/AdmissionMCQ")
);
const AddAdmissionMCQ = lazy(() =>
  import("../Pages/Admin/Admission/AdmissionMCQ/AddAdmissionMCQ")
);

const Packsges = lazy(() => import("../Pages/Admin/Packages/Packages"));
const AddPackage = lazy(() => import("../Pages/Admin/Packages/AddPackage"));
const EditPackage = lazy(() => import("../Pages/Admin/Packages/EditPackage"));

const Features = lazy(() => import("../Pages/Admin/Features/Features"));
const AddFeature = lazy(() => import("../Pages/Admin/Features/AddFeature"));
const EditFeature = lazy(() => import("../Pages/Admin/Features/EditFeature"));

const Admins = lazy(() => import("../Pages/Admin/Admins/Admins"));
const AddAdmin = lazy(() => import("../Pages/Admin/Admins/AddAdmin"));

const Logo = lazy(() => import("../Pages/Admin/FrontEndSetting/Logo/Logo"));
const Banner = lazy(() =>
  import("../Pages/Admin/FrontEndSetting/Banner/Banner")
);

const ContactUs = lazy(() =>
  import("../Pages/Admin/FrontEndSetting/ContactUs/ContactUs")
);

const Profile = lazy(() =>
  import("../Pages/Admin/GeneralSetting/Profile/Profile")
);

const BlogList = lazy(() => import("../Pages/Admin/Others/Blogs/AllBlogs.jsx"));
const ViewBlog = lazy(() => import("../Pages/Admin/Others/Blogs/ViewBlog.jsx"));
const QuestionList = lazy(() =>
  import("../Pages/Admin/Others/Questions/AllQuestions.jsx")
);
const ViewQuestion = lazy(() =>
  import("../Pages/Admin/Others/Questions/ViewQuestion.jsx")
);
const HandNoteList = lazy(() =>
  import("../Pages/Admin/Others/HandNote/AllHandNote.jsx")
);
const ViewHandNote = lazy(() =>
  import("../Pages/Admin/Others/HandNote/ViewHandNote.jsx")
);
const NoticeList = lazy(() =>
  import("../Pages/Admin/Others/Notice/AllNotice.jsx")
);
const ViewNotice = lazy(() =>
  import("../Pages/Admin/Others/Notice/ViewNotice.jsx")
);

const SEO = lazy(() => import("../Pages/Admin/SEO/SEO"));

const Institutes = lazy(() =>
  import("../Pages/Admin/Job/Institutes/Institutes.jsx")
);
const AddInstitute = lazy(() =>
  import("../Pages/Admin/Job/Institutes/AddInstitute.jsx")
);
const EditInstitute = lazy(() =>
  import("../Pages/Admin/Job/Institutes/EditInstitute.jsx")
);
const JobQuesSet = lazy(() =>
  import("../Pages/Admin/Job/JobQuesSet/JobQuesSet.jsx")
);
const AddJobQuesSet = lazy(() =>
  import("../Pages/Admin/Job/JobQuesSet/AddJobQuesSet.jsx")
);
const EditJobQuesSet = lazy(() =>
  import("../Pages/Admin/Job/JobQuesSet/EditJobQuesSet.jsx")
);
const JobMCQ = lazy(() => import("../Pages/Admin/Job/JobMCQ/JobMCQ.jsx"));
const AddJobMCQ = lazy(() => import("../Pages/Admin/Job/JobMCQ/AddJobMCQ.jsx"));
const JobModelTest = lazy(() =>
  import("../Pages/Admin/Job/JobModelTest/JobModelTest.jsx")
);
const AddJobModelTest = lazy(() =>
  import("../Pages/Admin/Job/JobModelTest/AddJobModelTest.jsx")
);
const EditJobModelTest = lazy(() =>
  import("../Pages/Admin/Job/JobModelTest/EditJobModelTest.jsx")
);

// Admin Board
const Boards = lazy(() => import("../Pages/Admin/Board/Boards/Boards.jsx"));
const AddBoard = lazy(() => import("../Pages/Admin/Board/Boards/AddBoard.jsx"));
const EditBoard = lazy(() =>
  import("../Pages/Admin/Board/Boards/EditBoard.jsx")
);
const BoardMCQ = lazy(() =>
  import("../Pages/Admin/Board/BoardMCQ/BoardMCQ.jsx")
);
const AddBoardMCQ = lazy(() =>
  import("../Pages/Admin/Board/BoardMCQ/AddBoardMCQ.jsx")
);

const BoardWritten = lazy(() =>
  import("../Pages/Admin/Board/BoardWritten/BoardWritten.jsx")
);
import AddBoardWritten from "../Pages/Admin/Board/BoardWritten/AddBoardWritten.jsx";
// const EditBoardWritten = lazy(() =>
//   import("../Pages/Admin/Job/JobModelTest/EditJobModelTest.jsx")
// );

import CurrentAffairs from "../Pages/Admin/CurrentAffairs/CurrentAffairs.jsx";
import AddCurrentAffairs from "../Pages/Admin/CurrentAffairs/AddCurrentAffairs.jsx";
import EditCurrentAffairs from "../Pages/Admin/CurrentAffairs/EditCurrentAffairs.jsx";
import EditAdmin from "../Pages/Admin/Admins/EditAdmin.jsx";
const SubChapters = lazy(() =>
  import("../Pages/Admin/Academy/Chapter/SubChapters/SubChapters")
);
const AddSubChapter = lazy(() =>
  import("../Pages/Admin/Academy/Chapter/SubChapters/AddSubChapter")
);
const EditSubChapter = lazy(() =>
  import("../Pages/Admin/Academy/Chapter/SubChapters/EditSubChapter")
);
const SubSubChapters = lazy(() =>
  import("../Pages/Admin/Academy/Chapter/SubSubChapters/SubSubChapters")
);
const AddSubSubChapter = lazy(() =>
  import("../Pages/Admin/Academy/Chapter/SubSubChapters/AddSubSubChapter")
);
const EditSubSubChapter = lazy(() =>
  import("../Pages/Admin/Academy/Chapter/SubSubChapters/EditSubSubChapter")
);
const AllModelTest = lazy(() =>
  import("../Pages/Admin/Academy/ModelTest/AllModelTest")
);
const AddModelTest = lazy(() =>
  import("../Pages/Admin/Academy/ModelTest/AddModelTest/AddModelTest")
);
const EditModeltest = lazy(() =>
  import("../Pages/Admin/Academy/ModelTest/EditModeltest/EditModeltest")
);
const AdmissionModelTest = lazy(() =>
  import("../Pages/Admin/Admission/AdmissionModelTest/AdmissionModelTest")
);
const AddAdmissionModelTest = lazy(() =>
  import(
    "../Pages/Admin/Admission/AdmissionModelTest/AddAdmissionModelTest/AddAdmissionModelTest"
  )
);

const EditAdmissionModelTest = lazy(() =>
  import(
    "../Pages/Admin/Admission/AdmissionModelTest/EditAdmissionModeltest/EditAdmissionModeltest.jsx"
  )
);

const FounderSpeech = lazy(() =>
  import("../Pages/Admin/FrontEndSetting/FounderSpeech/FounderSpeech")
);
const AllFAQ = lazy(() => import("../Pages/Admin/FrontEndSetting/FAQ/AllFAQ"));
const AddFaq = lazy(() => import("../Pages/Admin/FrontEndSetting/FAQ/AddFaq"));
const EditFaq = lazy(() =>
  import("../Pages/Admin/FrontEndSetting/FAQ/EditFaq")
);
const Tags = lazy(() => import("../Pages/Admin/Tags/Tags.jsx"));
const AddTag = lazy(() => import("../Pages/Admin/Tags/AddTag.jsx"));
const EditTag = lazy(() => import("../Pages/Admin/Tags/EditTag.jsx"));

const Years = lazy(() => import("../Pages/Admin/Years/Years.jsx"));
const AddYears = lazy(() => import("../Pages/Admin/Years/AddYears.jsx"));
const EditYears = lazy(() => import("../Pages/Admin/Years/EditYears.jsx"));

export const adminRoutes = {
  path: "/admin",
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    </Suspense>
  ),
  children: [
    { path: "dashboard", element: <Dashboard /> },
    { path: "academy/categories", element: <Categories /> },
    { path: "academy/category/add", element: <AddCategory /> },
    { path: "academy/category/edit/:id", element: <EditCategory /> },
    { path: "academy/classes", element: <Classes /> },
    { path: "academy/:categoryId/class/add", element: <AddClass /> },
    { path: "academy/class/edit/:id", element: <EditClass /> },
    { path: "academy/subjects", element: <Subject /> },
    { path: "academy/subject/add", element: <AddSubject /> },
    { path: "academy/subject/edit/:id", element: <EditSubject /> },
    { path: "academy/chapters", element: <Chapters /> },
    { path: "academy/chapter/add", element: <AddChapter /> },
    { path: "academy/chapter/edit/:id", element: <EditChapter /> },
    { path: "academy/sub-chapters", element: <SubChapters /> },
    { path: "academy/sub-chapter/add", element: <AddSubChapter /> },
    { path: "academy/sub-chapter/edit/:id", element: <EditSubChapter /> },
    { path: "academy/sub-sub-chapters", element: <SubSubChapters /> },
    { path: "academy/sub-sub-chapter/add", element: <AddSubSubChapter /> },
    {
      path: "academy/sub-sub-chapter/edit/:id",
      element: <EditSubSubChapter />,
    },
    { path: "academy/contents", element: <Contents /> },
    { path: "academy/content/add", element: <AddContent /> },
    { path: "academy/content/edit/:id", element: <EditContent /> },
    { path: "admission/universities", element: <Universities /> },
    { path: "admission/universities/add", element: <AddUniversity /> },
    { path: "admission/universities/edit/:id", element: <EditUniversity /> },
    { path: "admission/question-set", element: <QuestionSet /> },
    { path: "admission/question-set/add", element: <AddQuestionSet /> },
    { path: "admission/question-set/edit/:id", element: <EditQuestionSet /> },
    { path: "admission/mcq", element: <AdmissionMCQ /> },
    { path: "admission/mcq/add", element: <AddAdmissionMCQ /> },
    { path: "mcq/all", element: <MCQ /> },
    { path: "mcq/add", element: <AddMCQ /> },
    { path: "mcq/edit/:id", element: <EditMCQ /> },
    { path: "academy/writtens", element: <Writtens /> },
    { path: "academy/written/add", element: <AddWritten /> },
    { path: "academy/written/edit/:id", element: <EditWritten /> },
    { path: "academy/modeltest/all", element: <AllModelTest /> },
    { path: "academy/modeltest/add", element: <AddModelTest /> },
    { path: "academy/modeltest/edit/:id", element: <EditModeltest /> },
    { path: "admission/modeltest/all", element: <AdmissionModelTest /> },
    { path: "admission/modeltest/add", element: <AddAdmissionModelTest /> },
    {
      path: "admission/modeltest/edit/:id",
      element: <EditAdmissionModelTest />,
    },
    { path: "job/institutes", element: <Institutes /> },
    { path: "job/institutes/add", element: <AddInstitute /> },
    { path: "job/institutes/edit/:id", element: <EditInstitute /> },
    { path: "job/question-set", element: <JobQuesSet /> },
    { path: "job/question-set/add", element: <AddJobQuesSet /> },
    { path: "job/question-set/edit/:id", element: <EditJobQuesSet /> },
    { path: "job/mcq", element: <JobMCQ /> },
    { path: "job/mcq/add", element: <AddJobMCQ /> },
    { path: "job/modelTest/all", element: <JobModelTest /> },
    { path: "job/modelTest/add", element: <AddJobModelTest /> },
    { path: "job/modelTest/edit/:id", element: <EditJobModelTest /> },
    { path: "board-exam/board", element: <Boards /> },
    { path: "board-exam/add", element: <AddBoard /> },
    { path: "board-exam/edit/:id", element: <EditBoard /> },
    { path: "board-exam/mcq", element: <BoardMCQ /> },
    { path: "board-exam/mcq/add", element: <AddBoardMCQ /> },
    { path: "board-exam/written", element: <BoardWritten /> },
    { path: "board-exam/written/add", element: <AddBoardWritten /> },
    { path: "current-affairs", element: <CurrentAffairs /> },
    { path: "current-affairs/add", element: <AddCurrentAffairs /> },
    { path: "current-affairs/edit/:id", element: <EditCurrentAffairs /> },
    { path: "tags", element: <Tags /> },
    { path: "tags/add", element: <AddTag /> },
    { path: "tags/edit/:id", element: <EditTag /> },
    { path: "years", element: <Years /> },
    { path: "years/add", element: <AddYears /> },
    { path: "years/edit/:id", element: <EditYears /> },
    { path: "packages", element: <Packsges /> },
    { path: "packages/add", element: <AddPackage /> },
    { path: "packages/edit/:id", element: <EditPackage /> },
    { path: "features", element: <Features /> },
    { path: "features/add", element: <AddFeature /> },
    { path: "features/edit/:id", element: <EditFeature /> },
    { path: "admins", element: <Admins /> },
    { path: "admins/add", element: <AddAdmin /> },
    { path: "admins/edit/:id", element: <EditAdmin /> },
    { path: "front-end/logo", element: <Logo /> },
    { path: "front-end/banner", element: <Banner /> },
    { path: "front-end/founder-speech", element: <FounderSpeech /> },
    { path: "front-end/contact", element: <ContactUs /> },
    { path: "front-end/faq", element: <AllFAQ /> },
    { path: "front-end/faq/add", element: <AddFaq /> },
    { path: "front-end/faq/edit/:id", element: <EditFaq /> },
    { path: "general-setting/profile", element: <Profile /> },
    { path: "others/blog-all", element: <BlogList /> },
    { path: "others/view-blog/:id", element: <ViewBlog /> },
    { path: "others/question-all", element: <QuestionList /> },
    { path: "others/view-question/:id", element: <ViewQuestion /> },
    { path: "others/handnote-all", element: <HandNoteList /> },
    { path: "others/view-handnote/:id", element: <ViewHandNote /> },
    { path: "others/Notice-all", element: <NoticeList /> },
    { path: "others/view-Notice/:id", element: <ViewNotice /> },
    { path: "seo", element: <SEO /> },
  ],
};
