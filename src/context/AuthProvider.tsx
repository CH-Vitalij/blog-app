import { createContext, FC, useState } from "react";
import { useHaveUserData } from "../hooks/useHaveUserData";
import { AuthContextValue } from "../types/AuthContextTypes";
import { AuthProviderProps } from "../types/AuthProviderTypes";
import { removeUserData, setUserData } from "../features/UserData";
import { IUserData } from "../types/userDataTypes";

const initialValue: AuthContextValue = {
  auth: false,
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<AuthContextValue>(initialValue);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState(useHaveUserData());

  const signIn = (userData: IUserData, cb: () => void) => {
    setUserData(userData);
    setAuth(true);
    cb();
  };

  const signOut = (cb: () => void) => {
    removeUserData();
    setAuth(false);
    cb();
  };

  const value = { auth, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
