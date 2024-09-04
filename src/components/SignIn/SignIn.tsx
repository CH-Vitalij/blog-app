import { Form, Input, Button, ConfigProvider } from "antd";
import classes from "./SignIn.module.scss";
import { FC, useEffect } from "react";
import { Location, Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useLoginUserMutation } from "../../service/api";
import { isFetchBaseQueryError } from "../../features/isFetchBaseQueryError";
import { ILoginFormInput, ILoginServerError } from "../../types/loginTypes";
import { useAuth } from "../../hooks/useAuth";

interface LocationState {
  from?: string;
}

const SignIn: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<ILoginFormInput>({
    mode: "onSubmit",
  });

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const location = useLocation() as Location<LocationState>;
  const fromPage = location.state?.from || "/";
  const navigate = useNavigate();

  const { signIn } = useAuth();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    console.log(data);
    try {
      const result = await loginUser({
        user: {
          email: data.email,
          password: data.password,
        },
      }).unwrap();

      if (result) {
        console.log("Login success", result);
        signIn(result.user, () => navigate(fromPage, { replace: true }));
      }
    } catch (err) {
      console.error("Login error:", err);
      if (isFetchBaseQueryError(err)) {
        const serverError = err as ILoginServerError;
        console.log("serverError", serverError);

        if (serverError?.status === 422) {
          Object.keys(serverError.data.errors).forEach((key) => {
            setError("root.serverError", {
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
        className={`${classes.signIn}`}
        name="login"
        layout={"vertical"}
        autoComplete="off"
        onFinish={onFinish}
      >
        <fieldset className={`${classes.signInFieldset}`}>
          <legend className={`${classes.signInLegend}`}>Sign In</legend>
          <Form.Item
            className={`${classes.signInItemInput}`}
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
                  className={`${classes.signInInputEmail}`}
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
            className={`${classes.signInItemInput}`}
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field: { name, value, onChange } }) => (
                <Input.Password
                  className={`${classes.signInInputPassword}`}
                  visibilityToggle={false}
                  placeholder="Password"
                  name={name}
                  value={value}
                  onChange={onChange}
                  aria-invalid={errors.password || errors.root?.serverError ? "true" : "false"}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            className={`${classes.signInActions}`}
            validateStatus={errors.root?.serverError?.message ? "error" : ""}
            help={errors.root?.serverError?.message}
          >
            <Button
              className={`${classes.signInBtn}`}
              block
              type="primary"
              htmlType="submit"
              name="login"
              loading={isLoading}
            >
              Login
            </Button>
            Don`t have an account? <Link to="/register">Sign Up</Link>.
          </Form.Item>
        </fieldset>
      </Form>
    </ConfigProvider>
  );
};

export default SignIn;
