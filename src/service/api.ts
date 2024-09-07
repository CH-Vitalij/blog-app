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
    getArticles: builder.query<
      IArticlesResponse,
      { limit: string; offset: number; token?: string }
    >({
      query: ({ limit = "5", offset = 0, token }) => {
        const headers: Record<string, string> = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        return {
          url: `articles?${limit && `limit=${limit}&${`offset=${offset}`}`}`,
          headers,
        };
      },
      providesTags: ["Articles", "UserData"],
    }),
    getArticle: builder.query<IArticleResponse, { slug: string; token?: string }>({
      query: ({ slug, token }) => {
        const headers: Record<string, string> = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        return {
          url: `articles/${slug}`,
          headers,
        };
      },
      providesTags: ["UserData"],
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
      async onQueryStarted({ slug, token }, { dispatch, queryFulfilled }) {
        const resultArticle = dispatch(
          api.util.updateQueryData("getArticle", { slug, token }, (draftArticle) => {
            draftArticle.article.favorited = true;
            draftArticle.article.favoritesCount += 1;
          }),
        );

        const resultArticles = dispatch(
          api.util.updateQueryData(
            "getArticles",
            { limit: "5", offset: 0, token },
            (draftArticles) => {
              const targetArticle = draftArticles.articles.find((article) => article.slug === slug);

              if (targetArticle) {
                targetArticle.favorited = true;
                targetArticle.favoritesCount += 1;
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          resultArticle.undo();
          resultArticles.undo();
        }
      },
    }),
    deleteFavorite: builder.mutation<IArticleResponse, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `articles/${slug}/favorite`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }),
      async onQueryStarted({ slug, token }, { dispatch, queryFulfilled }) {
        const resultArticle = dispatch(
          api.util.updateQueryData("getArticle", { slug, token }, (draftArticle) => {
            draftArticle.article.favorited = false;
            draftArticle.article.favoritesCount -= 1;
          }),
        );

        const resultArticles = dispatch(
          api.util.updateQueryData(
            "getArticles",
            { limit: "5", offset: 0, token },
            (draftArticles) => {
              const targetArticle = draftArticles.articles.find((article) => article.slug === slug);

              if (targetArticle) {
                targetArticle.favorited = false;
                targetArticle.favoritesCount -= 1;
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          resultArticle.undo();
          resultArticles.undo();
        }
      },
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
  usePostFavoriteMutation,
  useDeleteFavoriteMutation,
} = api;
