import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".searchBtn") && !e.target.closest(".searchBox")) {
        setSearchDropdown(false);
      }
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const search = e.target.search.value;

    if (search) {
      navigate(`/exam-list?search=${search}`);
      e.target.reset();
      setSearchDropdown(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setSearchDropdown(!searchDropdown)}>
        <BiSearch className="searchBtn text-[22px] text-neutral/80 mt-2" />
      </button>

      <div
        className={`searchBox absolute top-10 right-0 bg-base-100 rounded p-3 shadow ${
          searchDropdown ? "block" : "hidden"
        }`}
      >
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="প্রশ্ন সার্চ করুন..."
            className="w-[95%] sm:w-80 placeholder:text-sm pl-7 px-3 border-primary/50 text-[15px]"
            name="search"
          />

          <BiSearch className="text-neutral/80 mt-2 absolute top-[2.5px] left-2" />
        </form>
      </div>
    </div>
  );
}
