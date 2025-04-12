import { Navigate } from "react-router-dom";
import { useAppSelector } from "../services/redux/hooks";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
