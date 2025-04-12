import { Navigate } from "react-router-dom";
import { useAppSelector } from "../services/redux/hooks";
import { JSX } from "react";

const RoleBasedRoute = ({
  children,
  allowedRole,
}: {
  children: JSX.Element;
  allowedRole: "admin" | "user";
}) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const role = localStorage.getItem("role");
  console.log(role);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (role !== allowedRole) return <Navigate to="/" replace />;

  return children;
};

export default RoleBasedRoute;
