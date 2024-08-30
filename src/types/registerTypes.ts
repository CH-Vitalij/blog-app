export interface RegisterUserRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface RegisterUserResponse {
  user: {
    username: string;
    email: string;
    token: string;
  };
}