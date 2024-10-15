import {
  FaFacebook,
  FaLinkedin,
  FaShareAlt,
  FaTelegram,
  FaWhatsappSquare,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Written from "../../WrittenF/WrittenCard";
import Pagination from "../../../../../Components/Pagination/Pagination";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useGetSingleBoardWrittenQuery } from "../../../../../Redux/api/board/boardWrittenApi";
import BoardExamModal from "../../../../../Components/UserLayoutComponents/Exam/BoardExamModal/BoardExamModal";

export default function BoardWrittenDetails() {
  const { id } = useParams();

  const [shareDropdown, setShareDropdown] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".sharebtn")) {
        setShareDropdown(null);
      }
    });
  }, [shareDropdown]);

  const data = useGetSingleBoardWrittenQuery(id);
  const boardExam = data?.data?.data;

  const [boardExamModal, setBoardExamModal] = useState(false);
  const [writtens, setWrittens] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(boardExam?.writtens?.length / limit);

  useEffect(() => {
    if (boardExam?.writtens?.length > 0) {
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;
      setWrittens(boardExam.writtens.slice(startIndex, endIndex));
    }
  }, [boardExam, currentPage]);

  return (
    <div className="">
      <div className="text-center bg-primary rounded text-white py-5 shadow">
        <h2 className="text-2xl font-semibold">{boardExam?.class?.name}</h2>
        <h3>
          {boardExam?.board?.name} || <span>{boardExam?.year}</span>
        </h3>
        <p>{boardExam?.subject?.name}</p>
        <div className="px-5 flex justify-between">
          <button
            onClick={() => setBoardExamModal(!boardExamModal)}
            className="py-1.5 px-4 rounded bg-secondary font-semibold border border-secondary hover:bg-black/30 duration-300 hover:shadow "
          >
            Start
          </button>
          {boardExamModal && (
            <BoardExamModal
              boardExam={boardExam}
              boardExamModal={boardExamModal}
              setBoardExamModal={setBoardExamModal}
            />
          )}
          <div className="text-base flex items-center relative">
            <button
              onClick={() => setShareDropdown(!shareDropdown)}
              className="sharebtn"
            >
              <FaShareAlt />
            </button>

            {shareDropdown && (
              <div className="absolute right-5 top-0 min-w-40 px-3 py-2 rounded bg-black shadow">
                <div className="flex items-center gap-2">
                  <p>Share:</p>
                  <div className="mt-2 sm:mt-0 flex gap-2">
                    <FacebookShareButton
                      url={`${
                        import.meta.env.VITE_FRONTEND_URL
                      }/academy/board-exam/written/${id}`}
                    >
                      <FaFacebook className="text-xl text-blue-600" />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`${
                        import.meta.env.VITE_FRONTEND_URL
                      }/academy/board-exam/written/${id}`}
                    >
                      <FaSquareXTwitter className="text-xl" />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={`${
                        import.meta.env.VITE_FRONTEND_URL
                      }/academy/board-exam/written/${id}`}
                    >
                      <FaTelegram className="text-xl text-sky-500" />
                    </TelegramShareButton>
                    <LinkedinShareButton
                      url={`${
                        import.meta.env.VITE_FRONTEND_URL
                      }/academy/board-exam/written/${id}`}
                    >
                      <FaLinkedin className="text-xl text-sky-400" />
                    </LinkedinShareButton>
                    <WhatsappShareButton
                      url={`${
                        import.meta.env.VITE_FRONTEND_URL
                      }/academy/board-exam/written/${id}`}
                    >
                      <FaWhatsappSquare className="text-xl text-green-500" />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <section>
        {/* Questions */}
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          {writtens?.map((written, i) => (
            <Written
              key={written?._id}
              written={written}
              i={i}
              page={currentPage}
              limit={limit}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            pages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </section>
    </div>
  );
}
