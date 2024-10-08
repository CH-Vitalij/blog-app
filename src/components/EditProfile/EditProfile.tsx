import { Button, Form, Input } from "antd";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { isFetchBaseQueryError } from "../../features/isFetchBaseQueryError";
import { IEditProfileFormInput, IEditProfileServerError } from "../../types/editProfileTypes";
import { useEditUserMutation, useGetUserQuery } from "../../service/api";
import { getToken } from "../../features/token";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { skipToken } from "@reduxjs/toolkit/query/react";

import classes from "./EditProfile.module.scss";

const EditProfile = () => {
  const token = getToken() as string;
  const { auth } = useAuth();
  const { data: fetchUserData } = useGetUserQuery(auth ? { token } : skipToken);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IEditProfileFormInput>({
    defaultValues: {
      username: fetchUserData?.user.username,
      email: fetchUserData?.user.email,
      image: fetchUserData?.user.image,
    },
    mode: "onSubmit",
  });

  const [editProfile, { isLoading, error }] = useEditUserMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IEditProfileFormInput> = async (formData) => {
    try {
      const result = await editProfile({
        body: {
          user: {
            email: formData.email,
            username: formData.username,
            image: formData.image !== "" ? formData.image : null,
            password: formData.newPassword,
          },
        },
        token,
      }).unwrap();

      if (result) {
        navigate("/");
      }
    } catch (err) {
      console.error("Edit error:", err);
      if (isFetchBaseQueryError(err)) {
        const serverError = err as IEditProfileServerError;

        if (serverError?.status === 422) {
          Object.keys(serverError.data.errors).forEach((key) => {
            setError(key as keyof IEditProfileFormInput, {
              type: "server",
              message: `${key} ${serverError.data.errors[key]}`,
            });
          });
        }
      } else {
        console.error("An unexpected error occurred", err);
      }
    }
  };

  if (isFetchBaseQueryError(error)) {
    if (error?.status !== 422) return <h1>Sorry, Something went wrong</h1>;
  }

  return (
    <Form
      className={`${classes.editProfile}`}
      name="editProfile"
      layout="vertical"
      autoComplete="off"
      onFinish={() => {
        void handleSubmit(onSubmit)();
      }}
    >
      <fieldset className={`${classes.editProfileFieldset}`}>
        <legend className={`${classes.editProfileLegend}`}>Edit Profile</legend>
        <Form.Item
          className={`${classes.editProfileItemInput}`}
          label="Username"
          validateStatus={errors.username ? "error" : ""}
          help={errors.username?.message}
        >
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              maxLength: {
                value: 20,
                message: "Username must not exceed 20 characters",
              },
            }}
            render={({ field: { name, value, onChange, ref } }) => (
              <Input
                className={`${classes.editProfileInputUsername}`}
                name={name}
                value={value}
                onChange={onChange}
                ref={ref}
                placeholder="Username"
                aria-invalid={errors.email ? "true" : "false"}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          className={`${classes.editProfileItemInput}`}
          label="Email address"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email address is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field: { name, value, onChange, ref } }) => (
              <Input
                className={`${classes.editProfileInputEmail}`}
                type="email"
                autoComplete="email"
                name={name}
                value={value}
                onChange={onChange}
                ref={ref}
                placeholder="Email address"
                aria-invalid={errors.email ? "true" : "false"}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          className={`${classes.editProfileItemInput}`}
          label="New password"
          validateStatus={errors.newPassword ? "error" : ""}
          help={errors.newPassword?.message}
        >
          <Controller
            name="newPassword"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Your password needs to be at least 6 characters.",
              },
              maxLength: {
                value: 40,
                message: "Your password must not exceed 40 characters",
              },
            }}
            render={({ field: { name, value, onChange } }) => (
              <Input.Password
                className={`${classes.editProfileInputPassword}`}
                placeholder="New password"
                visibilityToggle={false}
                name={name}
                value={value}
                onChange={onChange}
                aria-invalid={errors.newPassword ? "true" : "false"}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          className={`${classes.editProfileItemInput}`}
          label="Image image (url)"
          validateStatus={errors.image ? "error" : ""}
          help={errors.image?.message}
        >
          <Controller
            name="image"
            control={control}
            rules={{
              validate: (url) => {
                return new Promise((resolve) => {
                  if (!url) resolve(true);

                  const img = new Image();
                  img.onload = () => resolve(true);
                  img.onerror = () => resolve("URL must be valid");
                  if (url !== null) {
                    img.src = url;
                  } else {
                    resolve("URL must be valid");
                  }
                });
              },
            }}
            render={({ field: { name, value, onChange } }) => (
              <Input
                className={`${classes.editProfileInputAvatar}`}
                type="url"
                placeholder="Avatar image"
                name={name}
                value={value || ""}
                onChange={onChange}
                aria-invalid={errors.image ? "true" : "false"}
              />
            )}
          />
        </Form.Item>
        <Form.Item className={`${classes.editProfileActions}`}>
          <Button
            className={`${classes.editProfileBtn}`}
            block
            type="primary"
            htmlType="submit"
            name="save"
            loading={isLoading}
          >
            Save
          </Button>
        </Form.Item>
      </fieldset>
    </Form>
  );
};

export default EditProfile;
