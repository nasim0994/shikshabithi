import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import {
  useDeleteAskQuestionMutation,
  useGetAskQuestionsQuery,
  useToggleQuestionStatusMutation,
} from "../../../../Redux/api/askQuestionApi";
import { useEffect, useState } from "react";
import Pagination from "../../../../Components/Pagination/Pagination";

export default function AllQuestions() {
  let [currentPage, setCurrentPage] = useState(1);
  let limit = 10;
  let query = {};
  query["limit"] = limit;
  query["page"] = currentPage;
  const { data, isLoading } = useGetAskQuestionsQuery({ ...query });
  let questions = data?.data;

  console.log(questions);
  

  let [targetedQuestions, setTargetedQuestions] = useState([]);
  let [active, setActive] = useState(0);

  const pendingQuestions = questions?.filter((questions) => questions?.status == "pending");
  const activeQuestions = questions?.filter((questions) => questions?.status == "active");

  useEffect(() => {
    if (active == 0) {
      setTargetedQuestions(questions);
    } else if (active == 2) {
      setTargetedQuestions(pendingQuestions);
    } else if (active == 1) {
      setTargetedQuestions(activeQuestions);
    }
  }, [questions, activeQuestions, active, pendingQuestions]);

  const [deleteQuestion] = useDeleteAskQuestionMutation();
  const [toggleQuestion] = useToggleQuestionStatusMutation();

  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this Question?");
    if (isConfirm) {
      let res = await deleteQuestion(id);
      if (res?.data?.success) {
        toast.success("Question delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };
  let handleActive = async (id) => {
    let isConfirm = window.confirm("are you sure change the status?");
    if (isConfirm) {
      let res = await toggleQuestion({ id });
      if (res?.data?.success) {
        toast.success("Status change success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <div className="bg-base-100 p-4 rounded shadow flex gap-2 text-sm">
        <button
          onClick={() => setActive(0)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 0 && "text-white bg-primary"
          }`}
        >
          All Question
        </button>
        <button
          onClick={() => setActive(1)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 1 && "text-white bg-primary"
          }`}
        >
          Active Question
        </button>
        <button
          onClick={() => setActive(2)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 2 && "text-white bg-primary"
          }`}
        >
          Pending Question
        </button>
      </div>

      <div className="flex justify-between items-center p-3">
        {active === 0 ? (
          <h3>All Question</h3>
        ) : active === 0 ? (
          <h3>Active Questions</h3>
        ) : (
          <h3>Pending Questions</h3>
        )}
      </div>

      <div className="relative overflow-x-auto shadow bg-base-100 rounded">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Questions</th>
              <th className="text-center">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {targetedQuestions?.length > 0 ? (
              targetedQuestions?.map((question, i) => (
                <tr key={question?._id}>
                  <td>{i + 1}</td>
                  <td>{question?.question}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleActive(question?._id)}
                      className={
                        question?.status == "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {question?.status}
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <Link
                        to={`/admin/others/view-question/${question?._id}`}
                        className="hover:text-primary"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() => handleDelete(question?._id)}
                        className="hover:text-red-500"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p className="p-3 text-sm text-red-500">No Data Found!</p>
            )}
          </tbody>
        </table>
      </div>

      {questions?.length >= limit && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
