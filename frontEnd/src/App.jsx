import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Spinner from "./Components/Loader/Spinner/Spinner";
import useAuthCheck from "./Hook/useAuthCheck";
import { useGetFaviconQuery } from "./Redux/api/faviconApi";
import { Helmet } from "react-helmet-async";
import { mainRoutes } from "./Routers/mainRoutes";
import { userRoutes } from "./Routers/userRoutes";
import { commonRoutes } from "./Routers/commonRoutes";
import { adminRoutes } from "./Routers/adminRoutes";

export default function App() {
  const authChecked = useAuthCheck();

  const { data: favicon } = useGetFaviconQuery();
  const icon = favicon?.data?.icon;

  if (!authChecked) {
    return <Spinner />;
  }

  const router = createBrowserRouter([
    commonRoutes,
    mainRoutes,
    userRoutes,
    adminRoutes,
  ]);

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${import.meta.env.VITE_BACKEND_URL}/favicon/${icon}`}
        />
      </Helmet>
      <RouterProvider router={router} />
    </>
  );
}
