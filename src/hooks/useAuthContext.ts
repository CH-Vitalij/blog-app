import { useContext } from "react";
import { AuthContext } from "../HOC/AuthProvider";

export const useAuthContext = () => useContext(AuthContext);
