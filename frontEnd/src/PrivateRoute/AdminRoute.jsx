import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Spinner from "../Components/Loader/Spinner/Spinner";

export default function AdminRoute({ children }) {
  const { loggedUser } = useSelector((state) => state.user);
  const location = useLocation();
  const token = localStorage.getItem("token");
  let admin = loggedUser?.data?.role === "admin";

  if (!loggedUser?.success || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!admin) {
    Swal.fire("", "You can't access this page", "error");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success && admin) {
    return children;
  }

  if (!loggedUser?.success || !token) {
    return <Spinner />;
  }

  return <Spinner></Spinner>;
}
