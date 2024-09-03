import { createContext, FC, useState } from "react";
import { useHaveToken } from "../hooks/useHaveToken";
import { AuthContextValue } from "../types/AuthContextTypes";
import { AuthProviderProps } from "../types/AuthProviderTypes";
import { removeToken, setToken } from "../features/token";

const initialValue: AuthContextValue = {
  auth: false,
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<AuthContextValue>(initialValue);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState(useHaveToken());

  const signIn = (token: string, cb: () => void) => {
    setToken(token);
    setAuth(true);
    cb();
  };

  const signOut = (cb: () => void) => {
    removeToken();
    setAuth(false);
    cb();
  };

  const value = { auth, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
