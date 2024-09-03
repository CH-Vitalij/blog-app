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

export interface IRegisterFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
}

export interface IRegisterServerError {
  status: number;
  data: {
    errors: {
      [key: string]: string;
    };
  };
}
