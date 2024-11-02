/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Spinner from "../Components/Loader/Spinner/Spinner";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
const BlogDetails = lazy(() =>
  import("../Pages/UserLayoutPages/BlogDetails/BlogDetails")
);
const AddBlogPage = lazy(() =>
  import("../Pages/UserLayoutPages/Blogs/AddBlogPage")
);
const Blogs = lazy(() => import("../Pages/UserLayoutPages/Blogs/Blogs"));
const EditBlogPage = lazy(() =>
  import("../Pages/UserLayoutPages/Blogs/EditBlogPage")
);
const PrivateRoute = lazy(() => import("../PrivateRoute/PrivateRoute"));

export const mainRoutes = {
  path: "/",
  element: (
    <Suspense fallback={<Spinner />}>
      <MainLayout />
    </Suspense>
  ),
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "blogs",
      element: <Blogs />,
    },
    {
      path: "blog/:id",
      element: <BlogDetails />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "blog/add",
      element: (
        <PrivateRoute>
          <AddBlogPage />
        </PrivateRoute>
      ),
    },
    {
      path: "blog/edit/:id",
      element: (
        <PrivateRoute>
          <EditBlogPage />
        </PrivateRoute>
      ),
    },
  ],
};
