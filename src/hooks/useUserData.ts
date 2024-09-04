import { useMemo } from "react";
import { api } from "../service/api";
import { getToken } from "../features/token";
import { useAppSelector } from "./useAppSelector";

export const useUserData = () => {
  const token = getToken() as string;
  const selectUserData = useMemo(() => api.endpoints.getUser.select({ token }), [token]);
  const result = useAppSelector(selectUserData);
  return result;
};
