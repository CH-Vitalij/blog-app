import { Form, Input, Button, Checkbox, Divider } from "antd";
import classes from "./SignUp.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";

const SignUp: FC = () => {
  return (
    <div className={`${classes.signUp}`}>
      <Form
        name="register"
        initialValues={{ layout: "vertical" }}
        style={{ width: 320 }}
        layout={"vertical"}
        autoComplete="off"
      >
        <fieldset className={`${classes.signUpFieldset}`}>
          <legend className={`${classes.signUpLegend}`}>Create new account</legend>
          <Form.Item className={`${classes.signUpItemInput}`} label="Username" name="username">
            <Input className={`${classes.signUpInputUsername}`} placeholder="Username" />
          </Form.Item>
          <Form.Item className={`${classes.signUpItemInput}`} label="Email address" name="email">
            <Input className={`${classes.signUpInputEmail}`} placeholder="Email address" />
          </Form.Item>
          <Form.Item className={`${classes.signUpItemInput}`} label="Password" name="password">
            <Input.Password className={`${classes.signUpInputPassword}`} placeholder="Password" />
          </Form.Item>
          <Form.Item
            className={`${classes.signUpItemInput}`}
            label="Repeat Password"
            name="confirm"
          >
            <Input.Password className={`${classes.signUpInputPassword}`} placeholder="Password" />
          </Form.Item>
          <Divider className={`${classes.signUpDivider}`} />
          <Form.Item
            className={`${classes.signUpItemCheckbox}`}
            name="consent"
            valuePropName="checked"
          >
            <Checkbox className={`${classes.signUpCheckbox}`}>
              I agree to the processing of my personal information
            </Checkbox>
          </Form.Item>
          <Form.Item className={`${classes.signUpActions}`}>
            <Button className={`${classes.signUpBtn}`} block type="primary" htmlType="submit">
              Create
            </Button>
            Already have an account? <Link to="/sign-in">Sign In</Link>.
          </Form.Item>
        </fieldset>
      </Form>
    </div>
  );
};

export default SignUp;
