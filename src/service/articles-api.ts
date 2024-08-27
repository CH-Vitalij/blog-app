import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticlesRequest } from "../types/articlesTypes";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api/" }),
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesRequest, { limit: string; offset: number }>({
      query: ({ limit = "", offset = 0 }) =>
        `articles?${limit && `limit=${limit}&${offset && `offset=${offset}`}`}`,
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi;
