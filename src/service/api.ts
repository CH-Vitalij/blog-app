import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticlesResponse } from "../types/articlesTypes";
import { RegisterUserRequest, UserResponse } from "../types/registerTypes";

export const api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api/" }),
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, { limit: string; offset: number }>({
      query: ({ limit = "", offset = 0 }) => ({
        url: `articles?${limit && `limit=${limit}&${offset && `offset=${offset}`}`}`,
      }),
    }),
    getUser: builder.query<UserResponse, string>({
      query: (token) => ({
        url: "user",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    postUser: builder.mutation<UserResponse, RegisterUserRequest>({
      query: (body) => ({ url: "users", method: "POST", body }),
    }),
  }),
});

export const { useGetArticlesQuery, usePostUserMutation, useGetUserQuery } = api;
