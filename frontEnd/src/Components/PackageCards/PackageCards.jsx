import { useEffect, useState } from "react";
import { useGetPackagesQuery } from "../../Redux/api/packageApi";
import PackageCard from "./PackageCard";

export default function PackageCards() {
  const [type, setType] = useState("monthly");
  const [packages, setPackages] = useState([]);
  const { data, isLoading } = useGetPackagesQuery();
  useEffect(() => {
    if (data?.success) {
      let newPackages = data?.data?.filter((item) => item?.type == type);
      setPackages(newPackages);
    }
  }, [data, type]);

  if (isLoading) return "Loading...";

  return (
    <div>
      <div className="flex justify-center items-center mb-5 gap-4 text-xs">
        <button
          onClick={() => setType("monthly")}
          className={`px-6 py-2 rounded bg-gray-100 hover:bg-primary hover:text-base-100 duration-200 ${
            type == "monthly" && "bg-primary text-base-100"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setType("yearly")}
          className={`px-6 py-2 rounded bg-gray-100 hover:bg-primary hover:text-base-100 duration-200 ${
            type == "yearly" && "bg-primary text-base-100"
          }`}
        >
          Yearly
        </button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {packages?.map((item) => (
          <PackageCard key={item?._id} item={item} />
        ))}
      </div>
    </div>
  );
}
