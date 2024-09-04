export interface AuthContextValue {
  auth: boolean;
  signIn: (token: string, cb: () => void) => void;
  signOut: (cb: () => void) => void;
}
