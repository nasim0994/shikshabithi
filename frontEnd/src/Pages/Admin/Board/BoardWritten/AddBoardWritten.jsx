import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGetAcademySubjectsQuery } from "../../../../Redux/api/academy/subjectApi";
import { useGetBoardsQuery } from "../../../../Redux/api/board/boardApi";
import { useGetYearsQuery } from "../../../../Redux/api/yearApi";
import { useGetAcademyClassesQuery } from "../../../../Redux/api/academy/classApi";
import { useAddBoardWrittenMutation } from "../../../../Redux/api/board/boardWrittenApi";
import { useGetAcademyWrittenQuery } from "../../../../Redux/api/academy/writtenApi";

export default function AddBoardWritten() {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState("");
  const [writtenNumber, setWrittenNumber] = useState("");
  const [randomWritten, setRandomWritten] = useState([]);

  // ---------class
  const { data: cls } = useGetAcademyClassesQuery();
  const classes = cls?.data;
  const [selectedClass, setSelectedClass] = useState("");

  const filterCls = classes?.filter(
    (cls) => cls?.category?.uuid !== "101" && cls?.category?.uuid !== "102"
  );

  useEffect(() => {
    if (filterCls?.length > 0) {
      setSelectedClass(filterCls[0]?._id);
    }
  }, []);

  useEffect(() => {
    if (classes?.length > 0) {
      setSelectedClass(classes[0]?._id);
    }
  }, [classes]);

  //------------Boards
  const { data } = useGetBoardsQuery();
  const boards = data?.data;

  //------------Years
  const { data: yearsList } = useGetYearsQuery();
  const years = yearsList?.data;

  const [selectedBoard, setSelectedBoard] = useState("");
  useEffect(() => {
    if (boards?.length > 0) {
      setSelectedBoard(boards[0]?._id);
    }
  }, [boards]);

  //------------subject
  let subjectQuery = {};
  subjectQuery["cls"] = selectedClass;
  const { data: subject } = useGetAcademySubjectsQuery({ ...subjectQuery });
  const subjects = subject?.data;

  useEffect(() => {
    if (subjects?.length > 0) {
      setSelectedSubject(subjects[0]?._id);
    }
  }, [subjects]);

  //------------Written
  let writtenQuery = {};
  writtenQuery["cls"] = selectedClass;
  writtenQuery["subject"] = selectedSubject;
  const { data: written } = useGetAcademyWrittenQuery({ ...writtenQuery });

  const handleWritten = (value) => {
    if (value > written?.meta?.total) {
      return alert(`${value} Written is not available`), setWrittenNumber("");
    }
    setWrittenNumber(value);

    let writtens = written?.data;
    let copiedArray = [...writtens];
    for (let i = copiedArray?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }

    const randomWritten = copiedArray.slice(0, value);

    setRandomWritten(randomWritten?.map((item) => item?._id));
  };

  const [addBoardWritten, { isLoading }] = useAddBoardWrittenMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const board = e.target.board.value;
    const cls = e.target.class.value;
    const subject = e.target.subject.value;
    const year = e.target.year.value;

    if (randomWritten?.length < 1) {
      return alert("Enter atleast 1 Wriiten");
    }

    const info = {
      board,
      class: cls,
      subject,
      year,
      writtens: randomWritten,
    };

    let res = await addBoardWritten(info);

    if (res?.data?.success) {
      toast.success("Board Written add success");
      navigate("/admin/board-exam/written");
    } else {
      Swal.fire("", "something went wrong!", "error");
      console.log(res);
    }
  };

  return (
    <div className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium">Add Board Written</h3>
      </div>
      <div className="p-4">
        <form onSubmit={handleAdd} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-4">
            <div>
              <p className="mb-1">Boards</p>
              <select
                name="board"
                required
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
              >
                {boards?.map((u) => (
                  <option key={u?._id} value={u?._id}>
                    {u?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Class Name</p>
              <select
                name="class"
                required
                onChange={(e) => setSelectedClass(e.target.value)}
                value={selectedClass}
              >
                {filterCls?.map((clas) => (
                  <option key={clas?._id} value={clas?._id}>
                    {clas?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Select Subjects</p>
              <select
                name="subject"
                onChange={(e) => setSelectedSubject(e.target.value)}
                value={selectedSubject}
              >
                {subjects?.map((item) => (
                  <option key={item?._id} value={item?._id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Year</p>
              <select name="year" required>
                {years?.map((item) => (
                  <option key={item?._id} value={item?.year}>
                    {item?.year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>
                Available Written <small>({written?.meta?.total})</small>
              </p>
              <input
                type="number"
                onChange={(e) => handleWritten(e.target.value)}
                value={writtenNumber}
                required
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading && "disabled"}
              className="primary_btn text-sm"
            >
              {isLoading ? "Loading..." : "Add Board Written"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
