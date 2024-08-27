import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Articles } from "../types/articlesTypes";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api/" }),
  endpoints: (builder) => ({
    getArticles: builder.query<Articles[], string>({
      query: (limit = "") => `articles?${limit && `limit=${limit}`}`,
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi;
