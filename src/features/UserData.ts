import { IUserData } from "../types/userDataTypes";

export const setUserData = (userData: IUserData) => (localStorage.user = JSON.stringify(userData));
export const getUserData = () =>
  localStorage.user ? (JSON.parse(localStorage.user as string) as IUserData) : false;
export const removeUserData = () => localStorage.removeItem("user");
