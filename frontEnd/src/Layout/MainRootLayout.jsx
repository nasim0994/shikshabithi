import { Outlet } from "react-router-dom";
// import AdminNotice from "../Components/AdminNotice/AdminNotice";

export default function MainRootLayout() {
  return (
    <>
      <Outlet />

      {/* <AdminNotice /> */}
    </>
  );
}
