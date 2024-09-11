import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import { AuthProvider } from "../context/AuthProvider";
import { ConfigProvider } from "antd";

import "../styles/index.scss";

import HomePage from "./pages/HomePage";
import PrivateRoute from "../components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";

import {
  ArticleDetailPage,
  ArticlesPage,
  CreateArticlePage,
  EditArticlePage,
  EditProfilePage,
  SignInPage,
  SignUpPage,
} from "../lazyComponents";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />} errorElement={<ErrorPage />}>
      <Route index element={<ArticlesPage />} />
      <Route path="articles" element={<Navigate to="/" replace={true} />} />
      <Route path="articles/:slug" element={<ArticleDetailPage />} />
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<SignUpPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="profile" element={<EditProfilePage />} />
        <Route path="new-article" element={<CreateArticlePage />} />
        <Route path="articles/:slug/edit" element={<EditArticlePage />} />
      </Route>
    </Route>,
  ),
  {
    basename: "/blog-app",
  },
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        components: {
          Form: {
            verticalLabelPadding: 0,
          },
        },
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  </Provider>,
);
