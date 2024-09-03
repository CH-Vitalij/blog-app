import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticlesResponse, ArticleResponse } from "../types/articlesTypes";
import { IRegisterUserRequest, IRegisterUserResponse } from "../types/registerTypes";
import { ILoginUserRequest, ILoginUserResponse } from "../types/loginTypes";

export const api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api/" }),
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, { limit: string; offset: number }>({
      query: ({ limit = "5", offset = 0 }) => ({
        url: `articles?${limit && `limit=${limit}&${offset && `offset=${offset}`}`}`,
      }),
    }),
    getArticle: builder.query<ArticleResponse, { slug: string }>({
      query: ({ slug }) => ({
        url: `articles/${slug}`,
      }),
    }),
    registerUser: builder.mutation<IRegisterUserResponse, IRegisterUserRequest>({
      query: (body) => ({ url: "users", method: "POST", body }),
    }),
    loginUser: builder.mutation<ILoginUserResponse, ILoginUserRequest>({
      query: (body) => ({ url: "users/login", method: "POST", body }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = api;
