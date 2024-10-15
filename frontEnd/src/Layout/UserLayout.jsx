import "/src/assets/css/UserLayout.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserLayoutSidebar from "/src/Components/UserLayoutComponents/UserLayoutSidebar/UserLayoutSidebar";
import UserLayoutHeader from "/src/Components/UserLayoutComponents/UserLayoutHeader/UserLayoutHeader";

export default function UserLayout() {
  const [userSidebar, setUserSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        (!e.target.closest(".user_sidebar") &&
          !e.target.closest(".user_sidebar_btn")) ||
        e.target.closest(".sidebar_lists ul li a")
      ) {
        setUserSidebar(false);
      }
    });
  }, []);

  return (
    <section className="flex">
      <aside className={`user_sidebar ${userSidebar && "user_sidebar_show"}`}>
        <UserLayoutSidebar />
      </aside>
      <div className="user_content">
        <UserLayoutHeader setUserSidebar={setUserSidebar} />
        <main className="sm:p-3 py-3 min-h-[50vh]">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
