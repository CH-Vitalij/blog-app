export interface IRegisterUserRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface IRegisterUserResponse {
  user: {
    username: string;
    email: string;
    token: string;
  };
}