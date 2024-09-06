import { Outlet } from "react-router-dom";
import { useGetArticlesQuery, useGetUserQuery } from "../service/api";
import { useAuth } from "../hooks/useAuth";
import { Spin } from "antd";
import { getToken } from "../features/token";
import { skipToken } from "@reduxjs/toolkit/query/react";

import Header from "../components/Header";

const App: React.FC = () => {
  const { auth } = useAuth();
  const token = getToken() as string;

  const {
    isLoading: isLoadingUserData,
    isError: isErrorUserData,
    isFetching: isFetchingUserData,
  } = useGetUserQuery(auth ? { token } : skipToken);

  const {
    isLoading: isLoadingArticles,
    isError: isErrorArticles,
    isFetching: isFetchingArticles,
  } = useGetArticlesQuery({
    limit: "5",
    offset: 0,
  });

  if (isLoadingUserData || isLoadingArticles || isFetchingUserData || isFetchingArticles)
    return <Spin size="large" tip="Loading" fullscreen />;
  if (isErrorUserData || isErrorArticles) return <h1>Sorry, Something went wrong</h1>;

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
