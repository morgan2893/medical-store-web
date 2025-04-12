import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <header>User Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
