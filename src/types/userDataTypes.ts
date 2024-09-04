export interface IUserData {
  username: string;
  email: string;
  token: string;
  image: string;
}

export interface IGetUserResponse {
  user: {
    username: string;
    email: string;
    token: string;
    image: string;
  };
}
