import { IUserData } from "./userDataTypes";


export interface AuthContextValue {
  auth: boolean;
  signIn: (userData: IUserData, cb: () => void) => void;
  signOut: (cb: () => void) => void;
}
