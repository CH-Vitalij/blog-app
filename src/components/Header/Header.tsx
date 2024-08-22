import { NavLink } from "react-router-dom";
import classes from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={`${classes.header}`}>
      <nav className={`${classes.headerNav}`}>
        <NavLink to="/" className={`${classes.headerNavItem} ${classes.headerNavItemLeft}`}>
          Realworld Blog
        </NavLink>
        <NavLink to="sign-in" className={`${classes.headerNavItem}`}>
          Sign In
        </NavLink>
        <NavLink to="sign-up" className={`${classes.headerNavItem} ${classes.headerNavItemRight}`}>
          Sign Up
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
