import { Form, Input, Button, Checkbox, Divider, ConfigProvider } from "antd";
import classes from "./SignUp.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
}

const SignUp: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
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
        className={`${classes.signUp}`}
        name="register"
        initialValues={{ layout: "vertical" }}
        layout={"vertical"}
        autoComplete="off"
        onFinish={onFinish}
      >
        <fieldset className={`${classes.signUpFieldset}`}>
          <legend className={`${classes.signUpLegend}`}>Create new account</legend>
          <Form.Item className={`${classes.signUpItemInput}`} label="Username">
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
                <>
                  <Input
                    className={`${classes.signUpInputUsername}`}
                    placeholder="Username"
                    name={name}
                    value={value}
                    onChange={onChange}
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                  {errors.username && <p role="alert">{errors.username.message}</p>}
                </>
              )}
            />
          </Form.Item>
          <Form.Item className={`${classes.signUpItemInput}`} label="Email address">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email address is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field: { name, value, onChange } }) => (
                <>
                  <Input
                    className={`${classes.signUpInputEmail}`}
                    placeholder="Email address"
                    name={name}
                    value={value}
                    onChange={onChange}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p role="alert">{errors.email.message}</p>}
                </>
              )}
            />
          </Form.Item>
          <Form.Item className={`${classes.signUpItemInput}`} label="Password">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                maxLength: {
                  value: 40,
                  message: "Password must not exceed 40 characters",
                },
              }}
              render={({ field: { name, value, onChange } }) => (
                <>
                  <Input.Password
                    className={`${classes.signUpInputPassword}`}
                    placeholder="Password"
                    name={name}
                    value={value}
                    onChange={onChange}
                  />
                  {errors.password && <p role="alert">{errors.password.message}</p>}
                </>
              )}
            />
          </Form.Item>
          <Form.Item className={`${classes.signUpItemInput}`} label="Repeat Password">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match",
              }}
              render={({ field: { name, value, onChange } }) => (
                <>
                  <Input.Password
                    className={`${classes.signUpInputPassword}`}
                    placeholder="Confirm password"
                    name={name}
                    value={value}
                    onChange={onChange}
                  />
                  {errors.confirmPassword && <p role="alert">{errors.confirmPassword.message}</p>}
                </>
              )}
            />
          </Form.Item>
          <Divider className={`${classes.signUpDivider}`} />
          <Form.Item className={`${classes.signUpItemCheckbox}`} valuePropName="checked">
            <Controller
              name="consent"
              control={control}
              rules={{ required: "You must agree to the processing of your personal information" }}
              render={({ field: { name, value, onChange } }) => (
                <>
                  <Checkbox
                    className={`${classes.signUpCheckbox}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={value}
                  >
                    I agree to the processing of my personal information
                  </Checkbox>
                  {errors.consent && <p role="alert">{errors.consent.message}</p>}
                </>
              )}
            />
          </Form.Item>
          <Form.Item className={`${classes.signUpActions}`}>
            <Button className={`${classes.signUpBtn}`} block type="primary" htmlType="submit">
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
