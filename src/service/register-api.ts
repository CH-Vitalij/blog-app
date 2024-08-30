import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterUserRequest, RegisterUserResponse } from "../types/registerTypes";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api/" }),
  endpoints: (builder) => ({
    postUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (body) => ({ url: "users", method: "POST", body }),
    }),
  }),
});

export const { usePostUserMutation } = registerApi;
