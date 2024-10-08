import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "../service/api";
import { useAuth } from "../hooks/useAuth";
import { Spin } from "antd";
import { getToken } from "../features/token";
import { skipToken } from "@reduxjs/toolkit/query/react";

import Header from "../components/Header";

const App: React.FC = () => {
  const { auth } = useAuth();
  const token = getToken() as string;

  const { isLoading: isLoadingUserData, isError: isErrorUserData } = useGetUserQuery(
    auth ? { token } : skipToken,
  );

  if (isLoadingUserData) return <Spin size="large" tip="Loading" fullscreen />;
  if (isErrorUserData) return <h1>Sorry, Something went wrong</h1>;

  return (
    <>
      <Header />
      <main style={{ display: "flex", justifyContent: "center" }}>
        <Suspense fallback={<Spin size="large" tip="Loading" fullscreen />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default App;
