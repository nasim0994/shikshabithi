import { Link } from "react-router-dom";
import { FaQuoteRight } from "react-icons/fa";
import { BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { useGetFounderSpeechQuery } from "../../../Redux/api/founderSpeechApi";
import FounderSkeleton from "../../Skeleton/HomeSkeleton/FounderSkeleton";

export default function FounderSpeech() {
  const { data, isLoading } = useGetFounderSpeechQuery();
  const speech = data?.data;

  if (isLoading) return <FounderSkeleton />;

  return (
    <section className="py-5 sm:py-10">
      <div className="container bg-base-100 rounded px-4 py-8 shadow">
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <div className="w-40 sm:w-56 h-40 sm:h-56 mx-auto relative border-4 border-gray-200 rounded-full">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/founder/${
                  speech?.image
                }`}
                alt=""
                className="w-full h-full rounded-full"
              />
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary absolute top-0 right-0 sm:top-1 sm:right-2 text-base-100 flex justify-center items-center">
                <FaQuoteRight />
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-neutral text-sm sm:text-base">
              {speech?.speech}
            </h2>
            <div className="mt-4">
              <h3 className="text-lg font-medium">{speech?.name}</h3>
              <div className="flex gap-3 items-center">
                <Link
                  to={speech?.facebook}
                  target="_blank"
                  className="w-7 h-7 rounded-full bg-primary flex justify-center items-center text-base-100 hover:-mt-1 duration-200"
                >
                  <BiLogoFacebook className="text-lg" />
                </Link>
                <Link
                  to={speech?.linkedin}
                  target="_blank"
                  className="w-7 h-7 rounded-full bg-primary flex justify-center items-center text-base-100 hover:-mt-1 duration-200"
                >
                  <BiLogoLinkedin className="text-lg" />
                </Link>
                <Link
                  to={speech?.twitter}
                  target="_blank"
                  className="w-7 h-7 rounded-full bg-primary flex justify-center items-center text-base-100 hover:-mt-1 duration-200"
                >
                  <FaTwitter className="text-lg" />
                </Link>
                <Link
                  to={speech?.instagram}
                  target="_blank"
                  className="w-7 h-7 rounded-full bg-primary flex justify-center items-center text-base-100 hover:-mt-1 duration-200"
                >
                  <FaInstagram className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
