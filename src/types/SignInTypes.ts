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
