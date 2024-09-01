export interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
}

export interface ICustomError {
  status: number;
  data: {
    errors: {
      username?: string;
      email?: string;
    };
  };
}