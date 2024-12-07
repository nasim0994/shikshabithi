/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import MainRootLayout from "../Layout/MainRootLayout";

import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Spinner from "../Components/Loader/Spinner/Spinner";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import BlogLayout from "../Layout/BlogLayout";
import ContactUs from "../Pages/UserLayoutPages/ContactUs/ContactUs";
import AboutUs from "../Pages/UserLayoutPages/AboutUs/AboutUs";

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
  element: <MainRootLayout />,
  children: [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/contact-us",
          element: (
            <Suspense fallback={<Spinner />}>
              <ContactUs />
            </Suspense>
          ),
        },
        {
          path: "/about-us",
          element: (
            <Suspense fallback={<Spinner />}>
              <AboutUs />
            </Suspense>
          ),
        },
        {
          path: "blogs",
          element: (
            <Suspense fallback={<Spinner />}>
              <BlogLayout />
            </Suspense>
          ),
          children: [
            {
              path: "/blogs/:category",
              element: <Blogs />,
            },
          ],
        },
        {
          path: "blog/:id",
          element: (
            <Suspense fallback={<Spinner />}>
              <BlogDetails />
            </Suspense>
          ),
        },
        {
          path: "/privacy-policy",
          element: (
            <Suspense fallback={<Spinner />}>
              <PrivacyPolicy />
            </Suspense>
          ),
        },
        {
          path: "blog/add",
          element: (
            <Suspense fallback={<Spinner />}>
              <PrivateRoute>
                <AddBlogPage />
              </PrivateRoute>
            </Suspense>
          ),
        },
        {
          path: "blog/edit/:id",
          element: (
            <Suspense fallback={<Spinner />}>
              <PrivateRoute>
                <EditBlogPage />
              </PrivateRoute>
            </Suspense>
          ),
        },
      ],
    },
  ],
};
