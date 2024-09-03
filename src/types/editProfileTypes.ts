export interface IEditProfileRequest {
  user: {
    email: string;
    username: string;
    image: string;
    password: string;
  };
}

export interface IEditProfileResponse {
  user: {
    username: string;
    email: string;
    token: string;
    image: string;
  };
}

export interface IEditProfileServerError {
  status: number;
  data: {
    errors: {
      [key: string]: string;
    };
  };
}

export interface IEditProfileFormInput {
  email: string;
  username: string;
  image: string;
  newPassword: string;
}
