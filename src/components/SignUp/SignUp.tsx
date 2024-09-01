import { Form, Input, Button, Checkbox, Divider, ConfigProvider } from "antd";
import classes from "./SignUp.module.scss";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { usePostUserMutation } from "../../service/api";
import { isFetchBaseQueryError } from "../../features/isFetchBaseQueryError";
import { IFormInput, ICustomError } from "../../types/SignUpTypes";

const SignUp: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>({
    mode: "onSubmit",
  });

  const [createUser, { isLoading }] = usePostUserMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await createUser({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }).unwrap();

      if (result) {
        console.log("Registration success", result);
        navigate("/");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (isFetchBaseQueryError(err)) {
        const customError = err as ICustomError;
        console.log("customError", customError);
        if (customError?.status === 422) {
          const { username, email } = customError.data.errors;
          if (username) setError("username", { type: "server", message: username });
          if (email) setError("email", { type: "server", message: email });
        }
      } else {
        console.error("An unexpected error occurred", err);
        throw err;
      }
    }
  };

  const onFinish = () => {
    void handleSubmit(onSubmit)();
  };

  const getErrorMessage = (field: keyof IFormInput) => {
    return errors[field]?.message;
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
        className={`${classes.signUp}`}
        name="register"
        layout={"vertical"}
        autoComplete="off"
        onFinish={onFinish}
      >
        <fieldset className={`${classes.signUpFieldset}`}>
          <legend className={`${classes.signUpLegend}`}>Create new account</legend>
          <Form.Item
            className={`${classes.signUpItemInput}`}
            label="Username"
            validateStatus={errors.username ? "error" : ""}
            help={getErrorMessage("username")}
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
              render={({ field: { name, value, onChange } }) => (
                <Input
                  className={`${classes.signUpInputUsername}`}
                  placeholder="Username"
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            className={`${classes.signUpItemInput}`}
            label="Email address"
            validateStatus={errors.email ? "error" : ""}
            help={getErrorMessage("email")}
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
              render={({ field: { name, value, onChange } }) => (
                <Input
                  className={`${classes.signUpInputEmail}`}
                  placeholder="Email address"
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            className={`${classes.signUpItemInput}`}
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={getErrorMessage("password")}
          >
            <Controller
              name="password"
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
                  className={`${classes.signUpInputPassword}`}
                  placeholder="Password"
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            className={`${classes.signUpItemInput}`}
            label="Repeat Password"
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={getErrorMessage("confirmPassword")}
          >
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords must match",
              }}
              render={({ field: { name, value, onChange } }) => (
                <Input.Password
                  className={`${classes.signUpInputPassword}`}
                  placeholder="Confirm password"
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Form.Item>
          <Divider className={`${classes.signUpDivider}`} />
          <Form.Item
            className={`${classes.signUpItemCheckbox}`}
            valuePropName="checked"
            validateStatus={errors.consent ? "error" : ""}
            help={getErrorMessage("consent")}
          >
            <Controller
              name="consent"
              control={control}
              rules={{ required: "You must agree to the processing of your personal information" }}
              render={({ field: { name, value, onChange } }) => (
                <Checkbox
                  className={`${classes.signUpCheckbox}`}
                  name={name}
                  value={value}
                  onChange={onChange}
                  checked={value}
                >
                  I agree to the processing of my personal information
                </Checkbox>
              )}
            />
          </Form.Item>
          <Form.Item className={`${classes.signUpActions}`}>
            <Button
              className={`${classes.signUpBtn}`}
              block
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Create
            </Button>
            Already have an account? <Link to="/sign-in">Sign In</Link>.
          </Form.Item>
        </fieldset>
      </Form>
    </ConfigProvider>
  );
};

export default SignUp;
