import { Button, ConfigProvider, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import classes from "./EditProfile.module.scss";

export interface IEditProfileFormInput {
  username: string;
  email: string;
  newPassword: string;
  avatar: string;
}

const EditProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<IEditProfileFormInput>({
    mode: "onSubmit",
  });

  const onSubmit = () => console.log("onSubmit");

  const onFinish = () => {
    void handleSubmit(onSubmit)();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            verticalLabelPadding: 0,
          },
        },
      }}
    >
      <Form
        className={`${classes.editProfile}`}
        name="login"
        layout={"vertical"}
        autoComplete="off"
        onFinish={onFinish}
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
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  message: "Please enter a valid email address",
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
                  aria-invalid={errors.email || errors.root?.serverError ? "true" : "false"}
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
                  aria-invalid={errors.email || errors.root?.serverError ? "true" : "false"}
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
              }}
              render={({ field: { name, value, onChange } }) => (
                <Input.Password
                  className={`${classes.editProfileInputPassword}`}
                  placeholder="New password"
                  visibilityToggle={false}
                  name={name}
                  value={value}
                  onChange={onChange}
                  aria-invalid={errors.newPassword || errors.root?.serverError ? "true" : "false"}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            className={`${classes.editProfileItemInput}`}
            label="Avatar image (url)"
            validateStatus={errors.avatar ? "error" : ""}
            help={errors.avatar?.message}
          >
            <Controller
              name="avatar"
              control={control}
              rules={{
                required: "Avatar image is required",
              }}
              render={({ field: { name, value, onChange } }) => (
                <Input
                  className={`${classes.editProfileInputAvatar}`}
                  type="url"
                  placeholder="Avatar image"
                  name={name}
                  value={value}
                  onChange={onChange}
                  aria-invalid={errors.avatar || errors.root?.serverError ? "true" : "false"}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            className={`${classes.editProfileActions}`}
            validateStatus={errors.root?.serverError?.message ? "error" : ""}
            help={errors.root?.serverError?.message}
          >
            <Button
              className={`${classes.editProfileBtn}`}
              block
              type="primary"
              htmlType="submit"
              name="button"
            >
              Save
            </Button>
          </Form.Item>
        </fieldset>
      </Form>
    </ConfigProvider>
  );
};

export default EditProfile;
