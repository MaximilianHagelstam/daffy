import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Sidebar from "../Sidebar";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const currentUser = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Sidebar user={currentUser}>{children}</Sidebar>;
};

export default PrivateRoute;
