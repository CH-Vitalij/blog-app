export interface ILoginUserRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface ILoginUserResponse {
  user: {
    username: string;
    email: string;
    token: string;
  };
}