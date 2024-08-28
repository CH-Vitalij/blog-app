import { Form, Input, Button, Checkbox } from "antd";
import classes from "./SignUp.module.scss";

const SignUp = () => {
  return (
    <form action="" method="" className={`${classes.form}`} autoComplete="off">
      <fieldset className={`${classes.formFieldset}`}>
        <legend className={`${classes.formLegend}`}>Create new account</legend>
        <label className={`${classes.formLabelUsername}`} htmlFor="username">
          Username
        </label>
        <input
          className={`${classes.formInputUsername}`}
          type="text"
          id="username"
          placeholder="Username"
        />
        <label className={`${classes.formLabelEmail}`} htmlFor="email">
          Email address
        </label>
        <input
          className={`${classes.formInputEmail}`}
          type="email"
          name=""
          id="email"
          placeholder="Email address"
        />
        <label className={`${classes.formLabelPassword}`} htmlFor="password">
          Password
        </label>
        <input
          className={`${classes.formInputPassword}`}
          type="password"
          name=""
          id="password"
          placeholder="Password"
        />
        <label className={`${classes.formLabelPassword}`} htmlFor="repeatPassword">
          Repeat Password
        </label>
        <input
          className={`${classes.formInputPassword}`}
          type="password"
          name=""
          id="repeatPassword"
          placeholder="Password"
        />
        <hr className={`${classes.formLine}`} />
        <Checkbox className={`${classes.formCheckbox}`}>
          I agree to the processing of my personal information
        </Checkbox>
        <Button className={`${classes.formBtn}`} htmlType="submit">
          Create
        </Button>
      </fieldset>
    </form>
  );
};

export default SignUp;
