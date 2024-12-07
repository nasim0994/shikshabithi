import { Outlet } from "react-router-dom";
import CircularProgress from "../Components/ProgressScroll/ProgressScroll";
// import AdminNotice from "../Components/AdminNotice/AdminNotice";

export default function MainRootLayout() {
  return (
    <>
      <Outlet />

      {/* <AdminNotice /> */}
      <CircularProgress />
    </>
  );
}
