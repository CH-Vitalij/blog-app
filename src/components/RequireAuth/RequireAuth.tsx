import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const {auth} = useAuthContext();

  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default RequireAuth;
