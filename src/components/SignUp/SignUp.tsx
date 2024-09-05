import { Form, Input, Button, Checkbox, Divider, ConfigProvider } from "antd";
import classes from "./SignUp.module.scss";
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRegisterUserMutation } from "../../service/api";
import { isFetchBaseQueryError } from "../../features/isFetchBaseQueryError";
import { IRegisterFormInput, IRegisterServerError } from "../../types/registerTypes";

const SignUp: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<IRegisterFormInput>({
    mode: "onSubmit",
  });

  const [createUser, { isLoading, error }] = useRegisterUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
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
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (isFetchBaseQueryError(err)) {
        const serverError = err as IRegisterServerError;
        console.log("serverError", serverError);

        if (serverError?.status === 422) {
          Object.keys(serverError.data.errors).forEach((key) => {
            setError(key as keyof IRegisterFormInput, {
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

  const onFinish = () => {
    void handleSubmit(onSubmit)();
  };

  if (isFetchBaseQueryError(error)) {
    if (error?.status !== 422) return <h1>Sorry, Something went wrong</h1>;
  }

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
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <fieldset className={`${classes.signUpFieldset}`}>
          <legend className={`${classes.signUpLegend}`}>Create new account</legend>
          <Form.Item
            className={`${classes.signUpItemInput}`}
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
                  className={`${classes.signUpInputUsername}`}
                  placeholder="Username"
                  name={name}
                  value={value}
                  ref={ref}
                  onChange={onChange}
                  aria-invalid={errors.username ? "true" : "false"}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            className={`${classes.signUpItemInput}`}
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
              render={({ field: { name, value, onChange } }) => (
                <Input
                  className={`${classes.signUpInputEmail}`}
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  name={name}
                  value={value}
                  onChange={onChange}
                  aria-invalid={errors.email ? "true" : "false"}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            className={`${classes.signUpItemInput}`}
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
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
                  visibilityToggle={false}
                  placeholder="Password"
                  name={name}
                  value={value}
                  onChange={onChange}
                  aria-invalid={errors.password ? "true" : "false"}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            className={`${classes.signUpItemInput}`}
            label="Repeat Password"
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword?.message}
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
                  visibilityToggle={false}
                  placeholder="Confirm password"
                  name={name}
                  value={value}
                  onChange={onChange}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
              )}
            />
          </Form.Item>
          <Divider className={`${classes.signUpDivider}`} />
          <Form.Item
            className={`${classes.signUpItemCheckbox}`}
            valuePropName="checked"
            validateStatus={errors.consent ? "error" : ""}
            help={errors.consent?.message}
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
              name="create"
              loading={isLoading}
            >
              Create
            </Button>
            Already have an account? <Link to="/login">Sign In</Link>.
          </Form.Item>
        </fieldset>
      </Form>
    </ConfigProvider>
  );
};

export default SignUp;
