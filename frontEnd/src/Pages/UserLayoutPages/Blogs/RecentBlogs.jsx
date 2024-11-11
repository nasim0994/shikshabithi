import { Link } from "react-router-dom";
import { useGetByViewersQuery } from "../../../Redux/api/blogsApi.js";

export default function RecentBlogs() {
  let query = {};
  query["limit"] = 5;
  query["status"] = "active";
  const { data } = useGetByViewersQuery({ ...query });
  const blogs = data?.data;

  return (
    <div className="bg-base-100 rounded p-3 shadow">
      <h3 className="font-medium text-lg text-neutral border-b pb-1">
        Popular Blogs
      </h3>

      <div className="mt-2 flex flex-col gap-2">
        {blogs?.map((blog) => (
          <div
            key={blog?._id}
            className="flex items-center gap-1 border-b pb-2"
          >
            {blog?.img && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/blogs/${blog?.image}`}
                alt="blog"
                className="w-7 h-7 rounded"
                loading="lazy"
              />
            )}
            <h2>
              <Link
                to={`/blog/${blog?._id}`}
                className="text-base text-neutral font-medium hover:text-primary duration-200"
              >
                {blog?.title?.length > 30
                  ? blog?.title?.slice(0, 30) + "..."
                  : blog?.title}
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
