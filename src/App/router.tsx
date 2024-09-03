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
import RequireAuth from "../components/RequireAuth";
import { AuthProvider } from "../HOC/AuthProvider";
import EditProfilePage from "./pages/EditProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />} errorElement={<ErrorPage />}>
      <Route index element={<ArticlesPage />} />
      <Route path="articles" element={<Navigate to="/" replace />} />
      <Route path="articles/:slug" element={<ArticleDetailPage />} />
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<SignUpPage />} />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <EditProfilePage />
          </RequireAuth>
        }
      />
      <Route
        path="new-article"
        element={
          <RequireAuth>
            <h1>Создание статьи</h1>{" "}
          </RequireAuth>
        }
      />
      <Route
        path="articles/:slug/edit"
        element={
          <RequireAuth>
            <h1>Редактирование статьи</h1>{" "}
          </RequireAuth>
        }
      />
    </Route>,
  ),
  {
    basename: "/blog-app",
  },
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>,
);
