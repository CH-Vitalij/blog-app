import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error loading user data</h1>;

  return data ? <>{children}</> : <Navigate to="/login" />;
};

export default RequireAuth;
