import { useGetUserQuery } from "../service/api";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);

  const { data, isLoading, isError } = useGetUserQuery(token);

  return { data, isLoading, isError };
};
