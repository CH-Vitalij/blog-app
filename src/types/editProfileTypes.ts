export interface IEditProfileRequest {
  user: {
    email: string;
    username: string;
    image: string | null;
    password: string;
  };
}

export interface IEditProfileResponse {
  user: {
    username: string;
    email: string;
    token: string;
    image: string | null;
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
  image: string | null;
  newPassword: string;
}
