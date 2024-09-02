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
      username?: string;
      email?: string;
    };
  };
}