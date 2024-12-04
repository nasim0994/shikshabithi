import { Link } from "react-router-dom";
import moment from "moment";
import AcademySkeleton from "../../../Components/Skeleton/AcademySkeleton";
import { useGetIsHomeBlogQuery } from "../../../Redux/api//blogsApi";

export default function BlogsHome() {
  const { data, isLoading } = useGetIsHomeBlogQuery();
  const blogs = data?.data;

  if (isLoading) return <AcademySkeleton />;

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="tetx-2xl sm:text-3xl font-bold text-primary text-center italic section_line">
              Blog Content
            </h3>
          </div>

          <Link
            to="/blogs"
            className="bg-primary/10 px-3 py-1 rounded hover:bg-primary hover:text-base-100 duration-300 text-xs"
          >
            View All
          </Link>
        </div>

        <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {blogs?.length > 0 ? (
            blogs?.map((blog) => (
              <div key={blog?._id} className="bg-base-100 shadow rounded">
                {blog?.image && (
                  <Link to={`blog/${blog?._id}`} className="text-sm">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/blogs/${
                        blog?.image
                      }`}
                      alt="blog"
                      className="rounded-t w-full h-32 sm:h-44"
                      loading="lazy"
                    />
                  </Link>
                )}

                <div className="p-2 flex justify-between items-center">
                  <div className="flex items-start gap-2">
                    <img
                      src={
                        blog?.user?.profile?.image
                          ? `${import.meta.env.VITE_BACKEND_URL}/user/image/${
                              blog?.user?.profile?.image
                            }`
                          : `/images/demo_user.png`
                      }
                      alt=""
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <h3 className="text-neutral">
                        {blog?.user?.profile?.name}
                      </h3>
                      <p className="text-[11px] text-neutral-content">
                        {moment(blog?.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <Link
                    to={`/blog/${blog?._id}`}
                    className="text-neutral hover:text-primary duration-200 inline-block"
                  >
                    <h2 className="font-medium text-xl">{blog?.title}</h2>
                  </Link>

                  <p className="text-xs text-neutral-content mt-1">
                    {blog?.details.replace(/<[^>]+>/g, "").slice(0, 200) +
                      "..."}
                  </p>

                  <div>
                    <Link
                      to={`/blog/${blog?._id}`}
                      className="bg-primary/20 text-[9px] px-2 py-1 rounded text-primary font-semibold"
                    >
                      Reed More
                    </Link>
                  </div>
                </div>

                <div className="border-t p-2 flex gap-2">
                  <p className="px-2 py-[3px] bg-primary/5 text-[10px] rounded">
                    {blog?.subject?.name}
                  </p>

                  {blog?.chapter && (
                    <p className="px-2 py-[3px] bg-primary/5 text-[10px] rounded">
                      {blog?.chapter?.name}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-red-500">No Available Blog</p>
          )}
        </div>
      </div>
    </section>
  );
}
