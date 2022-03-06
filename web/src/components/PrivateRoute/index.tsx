import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Layout from "../Layout";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const currentUser = useContext(UserContext);
  if (!currentUser) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

export default PrivateRoute;
