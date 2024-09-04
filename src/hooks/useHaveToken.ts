import { getToken } from "../features/token";

export const useHaveToken = () => {
  return getToken() ? true : false;
};
