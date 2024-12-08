import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useGetFeatureQuery } from "../../../Redux/api/featureApi";
import { useGetFeatureImageQuery } from "../../../Redux/api/featureImageApi";

export default function Feature() {
  const { data: fImage } = useGetFeatureImageQuery();
  const featureImage = fImage?.data;

  const { data, isLoading } = useGetFeatureQuery();
  let features = data?.data;

  let content = null;

  if (isLoading)
    content = (
      <>
        <div className="bg-gray-100 rounded-xl h-36"></div>
        <div className="bg-gray-100 rounded-xl h-36"></div>
        <div className="bg-gray-100 rounded-xl h-36"></div>
      </>
    );

  if (!isLoading && features?.length > 0)
    content = features?.map((feature) => (
      <Link
        key={feature?._id}
        to={feature?.link}
        className="bg-base-100 shadow p-6 rounded-xl border hover:border-primary duration-300"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/feature/${
                feature?.icon
              }`}
              alt={feature?.title}
              className="w-8 sm:w-12"
            />
            <div>
              <h2 className="md:text-xl">{feature?.title}</h2>
              <p className="text-neutral-content text-sm">
                {feature?.subTitle}
              </p>
            </div>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
      </Link>
    ));

  return (
    <section className="relative z-30 bg-[#F2F7FD] mb-6">
      <div className="container py-5 sm:py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center section_line">
          শিক্ষা বীথি ফিচার্স
        </h2>

        <div className="mt-5 sm:mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
          {content}
        </div>
      </div>

      <div>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/feature/${
            featureImage?.image
          }`}
          alt="feature bg"
          className="w-full h-28"
        />
      </div>
    </section>
  );
}
