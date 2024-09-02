import { createContext, FC, ReactNode, useState } from "react";
import { useHaveToken } from "../hooks/useHaveToken";

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextValue {
  auth: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

const initialValue: AuthContextValue = {
  auth: false,
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<AuthContextValue>(initialValue);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState(useHaveToken());

  const setToken = (token: string) => localStorage.setItem("token", token);
  const removeToken = () => localStorage.removeItem("token");

  const signIn = (token: string) => {
    setToken(token);
    setAuth(true);
  };

  const signOut = () => {
    removeToken();
    setAuth(false);
  };

  const value = { auth, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
