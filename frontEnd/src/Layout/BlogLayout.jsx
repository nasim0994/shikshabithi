import { Suspense, lazy, useEffect } from "react";
import BlogHeader from "../Components/Blog/BlogHeader";
import { Outlet, useNavigate } from "react-router-dom";
// Lazy loading the components
const RecentBlogs = lazy(() =>
  import("../Pages/UserLayoutPages/Blogs/RecentBlogs")
);
const RelatedBlogs = lazy(() =>
  import("../Pages/UserLayoutPages/Blogs/RelatedBlogs")
);

export default function BlogLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/blogs") {
      navigate("/blogs/academy");
    }
  }, [navigate]);

  return (
    <div className="py-3">
      <div className="container">
        <BlogHeader />

        <div className="mt-2 grid lg:grid-cols-4 gap-3 items-start">
          <main className="lg:col-span-3">
            <Outlet />
          </main>

          <aside>
            <Suspense fallback={<div>Loading Recent Blogs...</div>}>
              <RecentBlogs />
            </Suspense>
            <Suspense fallback={<div>Loading Related Blogs...</div>}>
              <RelatedBlogs />
            </Suspense>
          </aside>
        </div>
      </div>
    </div>
  );
}
