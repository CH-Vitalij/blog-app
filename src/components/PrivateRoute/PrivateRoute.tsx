import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute: FC = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location.pathname }} replace={true} />
  );
};

export default PrivateRoute;
