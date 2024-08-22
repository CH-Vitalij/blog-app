import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

import "../styles/index.scss";

import ArticlesPage from "./pages/ArticlesPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />}>
      <Route index element={<ArticlesPage />} />
      <Route path="articles" element={<Navigate to={"/"} replace />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
    </Route>,
  ),
  {
    basename: "/blog-app",
  },
);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
