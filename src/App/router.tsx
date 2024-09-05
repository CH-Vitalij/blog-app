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

import "../assets/styles/index.scss";

import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "../components/PrivateRoute";
import { AuthProvider } from "../context/AuthProvider";
import EditProfilePage from "./pages/EditProfilePage";
import { ConfigProvider } from "antd";

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
        <Route path="new-article" element={<h1>Создание статьи</h1>} />
        <Route path="articles/:slug/edit" element={<h1>Редактирование статьи</h1>} />
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
