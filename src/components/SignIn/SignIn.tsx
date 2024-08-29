import { Form, Input, Button } from "antd";
import classes from "./SignIn.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";

const SignIn: FC = () => {
  return (
    <div className={`${classes.signIn}`}>
      <Form
        name="login"
        initialValues={{ layout: "vertical" }}
        style={{ width: 320 }}
        layout={"vertical"}
        autoComplete="off"
      >
        <fieldset className={`${classes.signInFieldset}`}>
          <legend className={`${classes.signInLegend}`}>Sign In</legend>
          <Form.Item className={`${classes.signInItemInput}`} label="Email address" name="email">
            <Input className={`${classes.signInInputEmail}`} placeholder="Email address" />
          </Form.Item>
          <Form.Item className={`${classes.signInItemInput}`} label="Password" name="password">
            <Input.Password className={`${classes.signInInputPassword}`} placeholder="Password" />
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
    </div>
  );
};

export default SignIn;
