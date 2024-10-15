import { useEffect, useState } from "react";
import BackBtn from "../../../Components/BackBtn/BackBtn";
import { useGetAcademyCategoriesQuery } from "../../../Redux/api/academy/categoryApi";
import { HiBuildingLibrary } from "react-icons/hi2";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useGetAcademyClassesQuery } from "../../../Redux/api/academy/classApi";
import AcademySkeleton from "../../../Components/Skeleton/AcademySkeleton";
import ClassCard from "./ClassCard";

export default function Academy() {
  const { data, isLoading } = useGetAcademyCategoriesQuery();
  const categories = data?.data;

  const { data: cls } = useGetAcademyClassesQuery({});

  const [activeCategory, setActiveCategory] = useState(null);
  const [targetedClass, setTargetedClass] = useState([]);

  useEffect(() => {
    if (categories?.length > 0) {
      setActiveCategory(categories[0]?._id);
      let filterClasses = cls?.data?.filter(
        (item) => item?.category?._id == categories[0]?._id
      );
      setTargetedClass(filterClasses);
    }
  }, [categories, cls]);

  const handleButtonClick = (categoryId) => {
    setActiveCategory(categoryId);

    let filterClasses = cls?.data?.filter(
      (item) => item?.category?._id == categoryId
    );

    setTargetedClass(filterClasses);
  };

  if (isLoading) return <AcademySkeleton />;

  return (
    <section>
      <div className="bg-base-100 p-4 rounded shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-primary font-bold">বিষয়ভিত্তিক কন্টেন্ট</h2>
          <BackBtn />
        </div>

        <div className="flex overflow-x-auto gap-2 mt-2 horizontal_scroll">
          {categories?.map((category) => (
            <button
              key={category?._id}
              onClick={() => handleButtonClick(category?._id)}
              className={`flex items-center gap-2 border rounded-xl px-2.5 py-1.5 duration-300 ${
                activeCategory === category._id
                  ? "bg-primary text-white"
                  : "hover:border-primary/60 hover:bg-primary/5"
              }`}
            >
              <HiBuildingLibrary className="opacity-50 -mt-px" />
              <p className="text-[11px] whitespace-nowrap">{category?.name}</p>

              {activeCategory === category._id && <IoCheckmarkDoneOutline />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {targetedClass?.length > 0 ? (
          targetedClass?.map((cls) => <ClassCard key={cls?._id} cls={cls} />)
        ) : (
          <div className="bg-base-100 p-4 rounded text-center text-red-500 text-xs">
            <p>No Class Found!</p>
          </div>
        )}
      </div>
    </section>
  );
}
