import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArticlesResponse, IArticleResponse, ICreateArticleRequest } from "../types/articlesTypes";
import { IRegisterUserRequest, IRegisterUserResponse } from "../types/registerTypes";
import { ILoginUserRequest, ILoginUserResponse } from "../types/loginTypes";
import { IEditProfileResponse, IEditProfileRequest } from "../types/editProfileTypes";
import { IGetUserResponse } from "../types/userDataTypes";

export const api = createApi({
  reducerPath: "Api",
  tagTypes: ["Articles", "UserData"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api/" }),
  endpoints: (builder) => ({
    getArticles: builder.query<IArticlesResponse, { limit: string; offset: number }>({
      query: ({ limit = "5", offset = 0 }) => ({
        url: `articles?${limit && `limit=${limit}&${offset && `offset=${offset}`}`}`,
      }),
      providesTags: ["Articles", "UserData"],
    }),
    getArticle: builder.query<IArticleResponse, { slug: string }>({
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
    getUser: builder.query<IGetUserResponse, { token: string }>({
      query: ({ token }) => ({
        url: "user",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["UserData"],
    }),
    editUser: builder.mutation<IEditProfileResponse, { body: IEditProfileRequest; token: string }>({
      query: ({ body, token }) => ({
        url: "user",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserData"],
    }),
    createArticle: builder.mutation<
      IArticleResponse,
      { body: ICreateArticleRequest; token: string }
    >({
      query: ({ body, token }) => ({
        url: "articles",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body,
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation<void, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `articles/${slug}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),
    postFavorite: builder.mutation<IArticleResponse, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `articles/${slug}/favorite`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
      }),
    }),
    deleteFavorite: builder.mutation<IArticleResponse, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `articles/${slug}/favorite`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useEditUserMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation,
} = api;
