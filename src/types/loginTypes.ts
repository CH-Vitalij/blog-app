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
    image: string | null;
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
