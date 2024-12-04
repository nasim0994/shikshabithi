import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { toast } from "react-toastify";

import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useToggleBlogHomeStatusMutation,
  useToggleBlogStatusMutation,
} from "../../../../Redux/api/blogsApi";
import { useEffect, useState } from "react";
import Pagination from "../../../../Components/Pagination/Pagination";

export default function AllBlogs() {
  let [currentPage, setCurrentPage] = useState(1);
  let limit = 10;
  let query = {};
  query["limit"] = limit;
  query["page"] = currentPage;
  const { data, isLoading } = useGetBlogsQuery({ ...query });
  let blogs = data?.data;

  let [targetedBlogs, setTargetedBlogs] = useState([]);
  let [active, setActive] = useState(0);

  const pendingBlogs = blogs?.filter((blog) => blog?.status == "pending");
  const activeBlogs = blogs?.filter((blog) => blog?.status == "active");

  useEffect(() => {
    if (active == 0) {
      setTargetedBlogs(blogs);
    } else if (active == 2) {
      setTargetedBlogs(pendingBlogs);
    } else if (active == 1) {
      setTargetedBlogs(activeBlogs);
    }
  }, [blogs, activeBlogs, active, pendingBlogs]);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteBlog] = useDeleteBlogMutation();
  const [toggleBlog] = useToggleBlogStatusMutation();

  const handleDelete = async (id) => {
    let isConfirm = window.confirm("are you sure delete this Blog?");
    if (isConfirm) {
      let res = await deleteBlog(id);
      if (res?.data?.success) {
        toast.success("Blog delete success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };
  let handleActive = async (id) => {
    let isConfirm = window.confirm("are you sure change the status?");
    if (isConfirm) {
      let res = await toggleBlog({ id });
      if (res?.data?.success) {
        toast.success("Status change success");
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  const [toggleBlogHomeStatus, { isLoading: uIsHomeLoading }] =
    useToggleBlogHomeStatusMutation();

  const handleUpdateIsHome = async (id) => {
    setSelectedBlog(id);

    console.log(id);

    const res = await toggleBlogHomeStatus(id);

    if (res?.data?.success) {
      toast.success("updated success");
    } else {
      toast.error(res?.data?.message || "Something went wrong!");
      console.log(res);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="bg-base-100 p-4 rounded shadow flex gap-2 text-sm">
        <button
          onClick={() => setActive(0)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 0 && "text-white bg-primary"
          }`}
        >
          All Blog
        </button>
        <button
          onClick={() => setActive(1)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 1 && "text-white bg-primary"
          }`}
        >
          Active Blog
        </button>
        <button
          onClick={() => setActive(2)}
          className={`flex items-center gap-2 border rounded px-2.5 py-1.5 duration-300 ${
            active == 2 && "text-white bg-primary"
          }`}
        >
          Pending Blog
        </button>
      </div>

      <div className="flex justify-between items-center p-3">
        {active === 0 ? (
          <h3>All Blog</h3>
        ) : active === 0 ? (
          <h3>Active Blogs</h3>
        ) : (
          <h3>Pending Blogs</h3>
        )}
      </div>

      <div className="relative overflow-x-auto shadow bg-base-100 rounded">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Title</th>
              <th>Home</th>
              <th className="text-center">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {targetedBlogs?.length > 0 ? (
              targetedBlogs?.map((blog, i) => (
                <tr key={blog?._id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      className="w-12 rounded-sm"
                      src={`${
                        blog?.image
                          ? `${import.meta.env.VITE_BACKEND_URL}/blogs/${
                              blog.image
                            }`
                          : "/images/defaultimg.png"
                      }`}
                      alt="Blog Image"
                    />
                  </td>
                  <td>{blog?.title}</td>
                  <td>
                    {uIsHomeLoading && selectedBlog === blog?._id ? (
                      <p>Loading..</p>
                    ) : (
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          checked={blog?.isHome && blog?.isHome}
                          type="checkbox"
                          value={blog?.isHome}
                          className="peer sr-only"
                          onChange={() => handleUpdateIsHome(blog?._id)}
                        />
                        <div className="peer h-[23px] w-11 rounded-full bg-gray-200 after:absolute after:start-[1px] after:top-[1.5px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                      </label>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleActive(blog?._id)}
                      className={
                        blog?.status == "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {blog?.status}
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <Link
                        to={`/admin/others/view-blog/${blog?._id}`}
                        className="hover:text-primary"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() => handleDelete(blog?._id)}
                        className="hover:text-red-500"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p className="p-3 text-sm text-red-500">No Data Found!</p>
            )}
          </tbody>
        </table>
      </div>

      {blogs?.length >= limit && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
