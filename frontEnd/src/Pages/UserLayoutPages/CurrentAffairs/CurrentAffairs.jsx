import { useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useGetCurrentAffairsQuery } from "../../../Redux/api/currentAffairsApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Pagination from "../../../Components/Pagination/Pagination";
import AcademySkeleton from "../../../Components/Skeleton/AcademySkeleton";

let categories = [
  { _id: 1, name: "Bangladesh" },
  { _id: 2, name: "International" },
  { _id: 3, name: "Bangladesh & International" },
];

export default function CurrentAffairsU() {
  window.scrollTo(0, 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(1);

  let query = {};
  query["category"] = activeCategory;
  query["page"] = currentPage;
  query["limit"] = 10;

  const { data, isLoading, isFetching } = useGetCurrentAffairsQuery({
    ...query,
  });
  const currentAffairs = data?.data;

  return (
    <div>
      <div className="bg-base-100 p-4 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="text-primary font-medium text-xl">Current Affairs</h3>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {categories?.map((category) => (
            <button
              key={category?._id}
              onClick={() => {
                setActiveCategory(category?._id);
              }}
              className={`flex items-center gap-2 border rounded-xl px-2.5 py-1.5 duration-300 ${
                activeCategory === category._id
                  ? "bg-primary text-white"
                  : "hover:border-primary/60 hover:bg-primary/5"
              }`}
            >
              <span className="opacity-50 -mt-px">{category?.icon}</span>
              <p className="text-[11px] whitespace-nowrap">{category?.name}</p>

              {activeCategory === category._id && <IoCheckmarkDoneOutline />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {isLoading || isFetching ? (
          <AcademySkeleton />
        ) : currentAffairs?.length > 0 ? (
          currentAffairs?.map((affairs, i) => {
            const timeAgoCreatedAt = moment(affairs?.createdAt).fromNow();
            const timeAgoUpdatedAt = moment(affairs?.updatedAt).fromNow();

            return (
              <div key={affairs?._id} className="bg-base-100 rounded shadow">
                <div className="px-3 py-2 border-b">
                  <Link to={`/current-affairs/${affairs?._id}`}>
                    <h2 className="text-xl hover:text-blue-500 duration-300">
                      {i + 1}. {affairs?.question}
                    </h2>
                  </Link>
                  <p className="text-[11px] text-neutral-content mt-1">
                    Created: {timeAgoCreatedAt} | Updated: {timeAgoUpdatedAt}
                  </p>
                </div>

                <div className="py-2">
                  <p className="text-primary pl-5 font-medium">
                    Ans:{" "}
                    {affairs?.ans?.length > 80
                      ? affairs?.ans.slice(0, 80) + "..."
                      : affairs?.ans}
                  </p>

                  <p className="mt-3 text-[10px] bg-gray-50 px-2 py-[2px] rounded w-max">
                    {affairs?.category == 1
                      ? "Bangladesh"
                      : affairs?.category == 2
                      ? "International"
                      : "Bangladesh & International"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-red-500 text-xs">No Question Available</p>
        )}
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
