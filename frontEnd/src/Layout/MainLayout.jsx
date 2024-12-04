import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
      <Footer />

    </>
  );
}
