export interface RegisterUserRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface UserResponse {
  user: {
    username: string;
    email: string;
    token: string;
  };
}