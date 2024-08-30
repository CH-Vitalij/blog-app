import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  // const auth = useAuth();
  const auth = false;
  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default RequireAuth;
