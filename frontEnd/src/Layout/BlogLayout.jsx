import { useState, Suspense, lazy, useEffect } from "react";
import BlogHeader from "../Components/Blog/BlogHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// Lazy loading the components
const RecentBlogs = lazy(() =>
  import("../Pages/UserLayoutPages/Blogs/RecentBlogs")
);
const RelatedBlogs = lazy(() =>
  import("../Pages/UserLayoutPages/Blogs/RelatedBlogs")
);

export default function BlogLayout() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.location.pathname === "/blogs") {
      navigate("/blogs/academy");
    }
  }, [navigate]);

  useEffect(() => {
    setSelectedSubject("");
  }, [pathname]);

  return (
    <div className="py-3">
      <div className="container">
        <BlogHeader
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />

        <div className="mt-2 grid lg:grid-cols-4 gap-3 items-start">
          <main className="lg:col-span-3">
            <Outlet context={{ selectedSubject }} />
          </main>

          <aside>
            <Suspense fallback={<div>Loading Recent Blogs...</div>}>
              <RecentBlogs />
            </Suspense>
            <Suspense fallback={<div>Loading Related Blogs...</div>}>
              <RelatedBlogs selectedSubject={selectedSubject} />
            </Suspense>
          </aside>
        </div>
      </div>
    </div>
  );
}
