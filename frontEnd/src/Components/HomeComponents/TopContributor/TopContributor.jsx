import { IoMdArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { TiStarburst } from "react-icons/ti";
import { FaLink, FaUsers } from "react-icons/fa";

import { VscActivateBreakpoints } from "react-icons/vsc";

export default function TopContributor() {
  return (
    <section className="pb-10">
      <div className="container shadow rounded p-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg sm:text-2xl font-bold text-primary">
            টপ কন্ট্রিবিউটর
          </h2>
          <Link
            to="/"
            className="text-[15px] sm:text-base flex items-center gap-2 hover:text-secondary duration-300"
          >
            View all <IoMdArrowRoundForward />
          </Link>
        </div>

        <div className="mt-2">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              540: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[Pagination]}
            className="p-2"
          >
            <SwiperSlide>
              <div className="w-full h-72 rounded shadow p-3">
                <div className="flex flex-col items-center">
                  <img
                    src="/images/tc1.png"
                    alt=""
                    className="w-24 h-24 rounded-full"
                  />
                  <h2 className="text-neutral font-medium mt-1">
                    Md Saiful Islam
                  </h2>
                  <p className="text-neutral-content text-sm">
                    Founder Of Top Study Zone
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-1 text-xs text-secondary font-medium uppercase">
                  <div className="flex items-center gap-1">
                    <p>
                      <TiStarburst className="text-[15px] text-yellow-600" />
                    </p>
                    <p>ADMINISTRATOR</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <p>
                      <TiStarburst className="text-[15px] text-yellow-600" />
                    </p>
                    <p>APPROVER</p>
                  </div>

                  <Link to="/" className="flex items-center gap-1">
                    <p>
                      <FaLink />
                    </p>
                    <p>see all</p>
                  </Link>
                </div>

                <div className="flex justify-between items-end text-[15px] mt-4">
                  <div>
                    <div className="flex items-center gap-1">
                      <p>
                        <VscActivateBreakpoints className="text-lg text-neutral-content" />
                      </p>
                      <p>
                        <span className="text-primary">3952</span> Points
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p>
                        <FaUsers className="text-base text-neutral-content" />
                      </p>
                      <p>
                        <span className="text-secondary">1.2k</span> Followers
                      </p>
                    </div>
                  </div>

                  <div>
                    <button className="bg-secondary px-4 py-1.5 rounded text-base-100 text-xs">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full h-72 rounded shadow p-3">
                <div className="flex flex-col items-center">
                  <img src="" alt="" className="w-24 h-24 rounded-full" />
                  <h2 className="text-neutral font-medium mt-1">
                    Md Nasim Uddin
                  </h2>
                  <p className="text-neutral-content text-sm">Jobs</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-1 text-xs text-secondary font-medium uppercase">
                  <div className="flex items-center gap-1">
                    <p>
                      <TiStarburst className="text-[15px] text-yellow-600" />
                    </p>
                    <p>ADMINISTRATOR</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <p>
                      <TiStarburst className="text-[15px] text-yellow-600" />
                    </p>
                    <p>APPROVER</p>
                  </div>

                  <Link to="/" className="flex items-center gap-1">
                    <p>
                      <FaLink />
                    </p>
                    <p>see all</p>
                  </Link>
                </div>

                <div className="flex justify-between items-end text-[15px] mt-4">
                  <div>
                    <div className="flex items-center gap-1">
                      <p>
                        <VscActivateBreakpoints className="text-lg text-neutral-content" />
                      </p>
                      <p>
                        <span className="text-primary">3952</span> Points
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p>
                        <FaUsers className="text-base text-neutral-content" />
                      </p>
                      <p>
                        <span className="text-secondary">1.2k</span> Followers
                      </p>
                    </div>
                  </div>

                  <div>
                    <button className="bg-secondary px-4 py-1.5 rounded text-base-100 text-xs">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full h-72 rounded shadow p-3">
                <div className="flex flex-col items-center">
                  <img src="" alt="" className="w-24 h-24 rounded-full" />
                  <h2 className="text-neutral font-medium mt-1">
                    Md Nasim Uddin
                  </h2>
                  <p className="text-neutral-content text-sm">Jobs</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-1 text-xs text-secondary font-medium uppercase">
                  <div className="flex items-center gap-1">
                    <p>
                      <TiStarburst className="text-[15px] text-yellow-600" />
                    </p>
                    <p>ADMINISTRATOR</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <p>
                      <TiStarburst className="text-[15px] text-yellow-600" />
                    </p>
                    <p>APPROVER</p>
                  </div>

                  <Link to="/" className="flex items-center gap-1">
                    <p>
                      <FaLink />
                    </p>
                    <p>see all</p>
                  </Link>
                </div>

                <div className="flex justify-between items-end text-[15px] mt-4">
                  <div>
                    <div className="flex items-center gap-1">
                      <p>
                        <VscActivateBreakpoints className="text-lg text-neutral-content" />
                      </p>
                      <p>
                        <span className="text-primary">3952</span> Points
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p>
                        <FaUsers className="text-base text-neutral-content" />
                      </p>
                      <p>
                        <span className="text-secondary">1.2k</span> Followers
                      </p>
                    </div>
                  </div>

                  <div>
                    <button className="bg-secondary px-4 py-1.5 rounded text-base-100 text-xs">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full h-72 rounded shadow p-3">
                <div className="flex flex-col items-center">
                  <img src="" alt="" className="w-24 h-24 rounded-full" />
                  <h2 className="text-neutral font-medium mt-1">
                    Md Nasim Uddin
                  </h2>
                  <p className="text-neutral-content text-sm">Jobs</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-1 text-xs text-secondary font-medium uppercase">
                  <div className="flex items-center gap-1">
                    <p>
                      <TiStarburst className="text-[15px] text-yellow-600" />
                    </p>
                    <p>ADMINISTRATOR</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <p>
                      <TiStarburst className="text-[15px] text-yellow-600" />
                    </p>
                    <p>APPROVER</p>
                  </div>

                  <Link to="/" className="flex items-center gap-1">
                    <p>
                      <FaLink />
                    </p>
                    <p>see all</p>
                  </Link>
                </div>

                <div className="flex justify-between items-end text-[15px] mt-4">
                  <div>
                    <div className="flex items-center gap-1">
                      <p>
                        <VscActivateBreakpoints className="text-lg text-neutral-content" />
                      </p>
                      <p>
                        <span className="text-primary">3952</span> Points
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p>
                        <FaUsers className="text-base text-neutral-content" />
                      </p>
                      <p>
                        <span className="text-secondary">1.2k</span> Followers
                      </p>
                    </div>
                  </div>

                  <div>
                    <button className="bg-secondary px-4 py-1.5 rounded text-base-100 text-xs">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full h-72 rounded shadow p-3">
                <div className="flex flex-col items-center">
                  <img src="" alt="" className="w-24 h-24 rounded-full" />
                  <h2 className="text-neutral font-medium mt-1">
                    Md Nasim Uddin
                  </h2>
                  <p className="text-neutral-content text-sm">Jobs</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-1 text-xs text-secondary font-medium uppercase">
                  <div className="flex items-center gap-1">
                    <p>
                      <TiStarburst className="text-[15px] text-yellow-600" />
                    </p>
                    <p>ADMINISTRATOR</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <p>
                      <TiStarburst className="text-[15px] text-yellow-600" />
                    </p>
                    <p>APPROVER</p>
                  </div>

                  <Link to="/" className="flex items-center gap-1">
                    <p>
                      <FaLink />
                    </p>
                    <p>see all</p>
                  </Link>
                </div>

                <div className="flex justify-between items-end text-[15px] mt-4">
                  <div>
                    <div className="flex items-center gap-1">
                      <p>
                        <VscActivateBreakpoints className="text-lg text-neutral-content" />
                      </p>
                      <p>
                        <span className="text-primary">3952</span> Points
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p>
                        <FaUsers className="text-base text-neutral-content" />
                      </p>
                      <p>
                        <span className="text-secondary">1.2k</span> Followers
                      </p>
                    </div>
                  </div>

                  <div>
                    <button className="bg-secondary px-4 py-1.5 rounded text-base-100 text-xs">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
