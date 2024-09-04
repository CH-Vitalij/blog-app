import { getUserData } from "../features/UserData";

export const useHaveUserData = () => {
  return getUserData() ? true : false;
};
