import { FC, ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: FC<RequireAuthProps> = (props) => {
  const { children } = props;
  return <h1>RequireAuth</h1>;
};

export default RequireAuth;
