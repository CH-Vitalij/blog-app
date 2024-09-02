import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { RequireAuthProps } from "../../types/RequireAuthTypes";

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const { auth } = useAuthContext();

  return auth ? <>{children}</> : <Navigate to="/login" state={{ from: location.pathname }} />;
};

export default RequireAuth;
