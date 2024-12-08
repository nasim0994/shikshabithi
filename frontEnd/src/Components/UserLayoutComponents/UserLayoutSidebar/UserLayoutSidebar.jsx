import { Link } from "react-router-dom";
import UserSidebarLists from "./UserSidebarLists";
import { MdOutlineLogin } from "react-icons/md";
import { useGetLogoQuery } from "../../../Redux/api/logoApi";

export default function UserLayoutSidebar() {
  const { data, isLoading } = useGetLogoQuery();

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <Link to="/" className="block pt-1">
          {isLoading ? (
            "Shiksha Bithi"
          ) : (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
                data?.data?.logo
              }`}
              alt="logo"
              className="w-32 sm:w-44"
            />
          )}
        </Link>

        <nav className="sidebar_lists mt-6 h-[78vh] overflow-y-auto">
          <UserSidebarLists />
        </nav>
      </div>
      <div>
        <Link
          to="/login"
          className="w-full flex gap-2 items-center justify-center bg-primary text-base-100 px-4 py-2 rounded"
        >
          <MdOutlineLogin className="text-lg" />
          Login Now
        </Link>
      </div>
    </div>
  );
}
