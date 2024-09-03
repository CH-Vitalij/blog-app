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

export interface ILoginFormInput {
  email: string;
  password: string;
}

export interface ILoginServerError {
  status: number;
  data: {
    errors: {
      [key: string]: string;
    };
  };
}
