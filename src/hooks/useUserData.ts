import { skipToken } from "@reduxjs/toolkit/query/react";
import { getToken } from "../features/token";
import { useGetUserQuery } from "../service/api";
import { useAuth } from "./useAuth";

export const seUserData = () => {
  const { auth } = useAuth();
  const token = getToken() as string;
  const { data } = useGetUserQuery(auth ? { token } : skipToken);
  return data
}