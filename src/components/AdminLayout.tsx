import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <header>Admin Header</header>
      <nav>Sidebar links</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
