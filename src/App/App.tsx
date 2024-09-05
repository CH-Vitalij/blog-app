import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import { api } from "../service/api";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAuth } from "../hooks/useAuth";
import { useUserData } from "../hooks/useUserData";
import { Spin } from "antd";
import { getToken } from "../features/token";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAuth();
  const token = getToken() as string;

  const { isLoading, isError } = useUserData();

  useEffect(() => {
    if (auth) {
      const result = dispatch(api.endpoints.getUser.initiate({ token }));

      return () => result.unsubscribe();
    }
  }, [dispatch, token, auth]);

  if (isLoading) return <Spin size="large" tip="Loading" fullscreen />;
  if (isError) return <h1>Sorry, Something went wrong</h1>;

  return (
    <>
      <Header />
      <main style={{ display: "flex", justifyContent: "center" }}>
        <Outlet />
      </main>
    </>
  );
};

export default App;
