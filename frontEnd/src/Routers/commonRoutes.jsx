import { Suspense } from "react";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/Login/Login";
import Spinner from "../Components/Loader/Spinner/Spinner";
import Signup from "../Pages/Signup/Signup";
import RecoverPassword from "../Pages/RecoverPassword/RecoverPassword";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import RegisterSuccess from "../Pages/Signup/RegisterSuccess";

export const commonRoutes = {
  children: [
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Spinner />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<Spinner />}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "/register/success",
      element: (
        <Suspense fallback={<Spinner />}>
          <RegisterSuccess />
        </Suspense>
      ),
    },
    {
      path: "/forgotPassword/setNewPassword",
      element: (
        <Suspense fallback={<Spinner />}>
          <RecoverPassword />
        </Suspense>
      ),
    },
    {
      path: "/forgotPassword",
      element: (
        <Suspense fallback={<Spinner />}>
          <ForgotPassword />
        </Suspense>
      ),
    },
  ],
};
