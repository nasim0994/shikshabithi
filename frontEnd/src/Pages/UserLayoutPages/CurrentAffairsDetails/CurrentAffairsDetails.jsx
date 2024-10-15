import { Link, useParams } from "react-router-dom";
import {
  useGetCurrentAffairQuery,
  useGetCurrentAffairsQuery,
} from "../../../Redux/api/currentAffairsApi";
import moment from "moment";

export default function CurrentAffairsDetails() {
  const { id } = useParams();
  const { data } = useGetCurrentAffairQuery(id);
  const affairs = data?.data;

  const timeAgoCreatedAt = moment(affairs?.createdAt).fromNow();
  const timeAgoUpdatedAt = moment(affairs?.updatedAt).fromNow();

  let query = {};
  query["category"] = affairs?.category;

  const { data: related } = useGetCurrentAffairsQuery({ ...query });
  const currentAffairs = related?.data;

  return (
    <div>
      <div className="bg-base-100 rounded shadow">
        <div className="px-3 py-2 border-b">
          <h2 className=" hover:text-blue-500 duration-300">
            {affairs?.question}
          </h2>
          <p className="text-[11px] text-neutral-content mt-1">
            Created: {timeAgoCreatedAt} | Updated: {timeAgoUpdatedAt}
          </p>
        </div>

        <div className="p-3">
          <p className="text-primary pl-5 text-sm">{affairs?.ans}</p>

          <p className="mt-3 text-[10px] bg-gray-50 px-2 py-[2px] rounded w-max">
            {affairs?.category == 1
              ? "Bangladesh"
              : affairs?.category == 2
              ? "International"
              : "Bangladesh & International"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-primary/80 rounded p-3">
          <h3 className="text-base-100">Related Question</h3>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {currentAffairs?.length > 0 ? (
            currentAffairs?.map((affairs, i) => {
              const timeAgoCreatedAt = moment(affairs?.createdAt).fromNow();
              const timeAgoUpdatedAt = moment(affairs?.updatedAt).fromNow();

              return (
                <div key={affairs?._id} className="bg-base-100 rounded shadow">
                  <div className="px-3 py-2 border-b">
                    <Link to={`/current-affairs/${affairs?._id}`}>
                      <h2 className=" hover:text-blue-500 duration-300">
                        {i + 1}. {affairs?.question}
                      </h2>
                    </Link>
                    <p className="text-[11px] text-neutral-content mt-1">
                      Created: {timeAgoCreatedAt} | Updated: {timeAgoUpdatedAt}
                    </p>
                  </div>

                  <div className="p-3">
                    <p className="text-primary pl-5 text-sm">
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
      </div>
    </div>
  );
}
