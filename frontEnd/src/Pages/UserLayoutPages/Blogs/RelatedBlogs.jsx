import { Link, useLocation, useParams } from "react-router-dom";
import { useGetBlogsQuery } from "../../../Redux/api/blogsApi";

export default function RelatedBlogs() {
  const { category } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchSubject = queryParams.get("subject");

  let query = {};
  query["category"] = category;
  query["subject"] = searchSubject || "all";
  query["limit"] = 10;
  query["status"] = "active";

  const { data } = useGetBlogsQuery({ ...query });
  const blogs = data?.data;

  return (
    <div className="mt-3 bg-base-100 rounded p-3 shadow">
      <h3 className="font-medium text-lg text-neutral border-b pb-1">
        Related Blogs
      </h3>

      <div className="mt-2 flex flex-col gap-2">
        {blogs?.map((blog) => (
          <div
            key={blog?._id}
            className="flex items-center gap-1 border-b pb-2"
          >
            {blog?.image && (
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
