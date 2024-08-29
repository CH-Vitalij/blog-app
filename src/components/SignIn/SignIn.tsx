import { Form, Input, Button, ConfigProvider } from "antd";
import classes from "./SignIn.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
        className={`${classes.signIn}`}
        name="login"
        initialValues={{ layout: "vertical" }}
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
              render={({ field: { name, value, onChange } }) => (
                <Input
                  className={`${classes.signInInputEmail}`}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder="Email address"
                  aria-invalid={errors.email ? "true" : "false"}
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
                  placeholder="Password"
                  name={name}
                  value={value}
                  onChange={onChange}
                  aria-invalid={errors.username ? "true" : "false"}
                />
              )}
            />
          </Form.Item>
          <Form.Item className={`${classes.signInActions}`}>
            <Button className={`${classes.signInBtn}`} block type="primary" htmlType="submit">
              Login
            </Button>
            <span>
              Don`t have an account? <Link to="/sign-up">Sign Up</Link>.
            </span>
          </Form.Item>
        </fieldset>
      </Form>
    </ConfigProvider>
  );
};

export default SignIn;
