import { lazy } from "react";

export const ArticlesPage = lazy(() => import("./App/pages/ArticlesPage"));
export const ArticleDetailPage = lazy(() => import("./App/pages/ArticleDetailPage"));
export const SignInPage = lazy(() => import("./App/pages/SignInPage"));
export const SignUpPage = lazy(() => import("./App/pages/SignUpPage"));
export const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
export const EditProfilePage = lazy(() => import("./App/pages/EditProfilePage"));
export const CreateArticlePage = lazy(() => import("./App/pages/CreateArticlePage"));
export const EditArticlePage = lazy(() => import("./App/pages/EditArticlePage"));
