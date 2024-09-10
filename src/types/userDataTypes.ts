export interface IGetUserResponse {
  user: {
    username: string;
    email: string;
    token: string;
    image: string | null;
  };
}
