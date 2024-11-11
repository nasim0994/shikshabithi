const express = require("express");
const router = express.Router();

//------------------------------------------------------------------------------
// Common
//------------------------------------------------------------------------------
const logo = require("./logoRoutes");
const favicon = require("./faviconRoutes");
const banner = require("./bannerRoutes");

const package = require("./packageRoutes");
const faq = require("./faqRoutes");
const feedback = require("./feedbackRoutes");
const feature = require("./featureRoutes");
const founderSpeech = require("./founderSpeechRoutes");
const askQuestion = require("./askQuestionRoutes");
const askAns = require("./askAnsRoutes");
const blogs = require("./blogsRoutes");
const blogComment = require("./blogCommentRoutes");
const handnotes = require("./handnotesRoutes");
const notice = require("./noticeRoutes");

const admin = require("./adminRoutes");
const user = require("./userRoutes");
const userImage = require("./profile/imageRoutes");
const userBanner = require("./profile/bannerRoutes");
const userInfo = require("./profile/infoRoutes");
const userPassword = require("./profile/passwordRoutes");

const tag = require("./tagRoutes");
const year = require("./yearsRoute");
const currentAffairs = require("./currentAffairsRoutes");
const contact = require("./contactRoutes");
const privacy = require("./privacyRoute");
const paymentInstruction = require("./paymentInstructionRoute");
const paymentRequest = require("./paymentRequestRoute");
const seo = require("./seoRoutes");

const allModeltest = require("./modelTestRoute");
const allModeltestAttend = require("./modelTestAttendRoute");

router.use("/modeltest", allModeltest);
router.use("/modeltest-attend", allModeltestAttend);

router.use("/logo", logo);
router.use("/favicon", favicon);
router.use("/banner", banner);

router.use("/package", package);
router.use("/faq", faq);
router.use("/feedback", feedback);
router.use("/feature", feature);
router.use("/founderSpeech", founderSpeech);
router.use("/askQuestion", askQuestion);
router.use("/askAns", askAns);
router.use("/blogs", blogs);
router.use("/blogComment", blogComment);
router.use("/handnotes", handnotes);
router.use("/notice", notice);

router.use("/admin", admin);
router.use("/user", user);
router.use("/user/image", userImage);
router.use("/user/banner", userBanner);
router.use("/user/info", userInfo);
router.use("/user/password", userPassword);

router.use("/tag", tag);
router.use("/year", year);
router.use("/currentAffairs", currentAffairs);
router.use("/contact", contact);
router.use("/privacy", privacy);
router.use("/payment-instruction", paymentInstruction);
router.use("/payment-request", paymentRequest);
router.use("/seo", seo);

//------------------------------------------------------------------------------
// Academy Routes
//------------------------------------------------------------------------------
const categoryRoutes = require("./academy/category.routes");
const classRoutes = require("./academy/class.routes");
const subjectRoutes = require("./academy/subject.routes");
const chapterRoutes = require("./academy/chapter.routes");
const subChapterRoutes = require("./academy/subChapter.routes");
const subSubChapterRoutes = require("./academy/subSubChapter.routes");
const contentRoutes = require("./academy/content.routes");

const mcqRouters = require("./academy/mcq.routes");
const writtenRouters = require("./academy/written.routes");
const onDemandTestRouters = require("./academy/onDemandTest.routes");
const examModelTest = require("./academy/academyModelTestRoute");

router.use("/academy/category", categoryRoutes);
router.use("/academy/class", classRoutes);
router.use("/academy/subject", subjectRoutes);
router.use("/academy/chapter", chapterRoutes);
router.use("/academy/sub-chapter", subChapterRoutes);
router.use("/academy/sub-sub-chapter", subSubChapterRoutes);
router.use("/academy/content", contentRoutes);

router.use("/academy/mcq", mcqRouters);
router.use("/academy/written", writtenRouters);
router.use("/academy/ondemandtest", onDemandTestRouters);

router.use("/examModelTest", examModelTest);

//------------------------------------------------------------------------------
// Admission Routes
//------------------------------------------------------------------------------
const universityRoutes = require("./admission/university.routes");
const questionSetRoutes = require("./admission/questionSet.routes");
const admissionMCQRoutes = require("./admission/admissionMCQ.routes");
const admissionModeltest = require("./admission/admissionModelTestRoute");

router.use("/admission/university", universityRoutes);
router.use("/admission/questionSet", questionSetRoutes);
router.use("/admission/mcq", admissionMCQRoutes);
router.use("/admission/modelTest", admissionModeltest);

//------------------------------------------------------------------------------
// Job Routes
//------------------------------------------------------------------------------
const institute = require("./job/instituteRoutes");
const jobQuesSet = require("./job/jobQuesSetRoutes");
const jobMcq = require("./job/jobMCQRoutes");
const jobModeltest = require("./job/jobModelTestRoute");

router.use("/job/institute", institute);
router.use("/job/questionSet", jobQuesSet);
router.use("/job/mcq", jobMcq);
router.use("/job/modelTest", jobModeltest);

//------------------------------------------------------------------------------
// Board Routes
//------------------------------------------------------------------------------
const board = require("./board/boardRoute");
const boardMcq = require("./board/boardMcqRoute");
const boardWritten = require("./board/boardWrittenRoute");
const boardExamResult = require("./board/boardExamResultRoute");

router.use("/board-exam/board", board);
router.use("/board-exam/boardMcq", boardMcq);
router.use("/board-exam/boardWritten", boardWritten);
router.use("/boardExamResult", boardExamResult);

module.exports = router;
