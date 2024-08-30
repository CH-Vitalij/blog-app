import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={`${classes.header}`}>
      <nav className={`${classes.headerNav}`}>
        <Link to="/" className={`${classes.headerNavItem}`}>
          Realworld Blog
        </Link>
        <div>
          <Link to="login" className={`${classes.headerNavItem}`}>
            Sign In
          </Link>
          <Link
            to="register"
            className={`${classes.headerNavItem} ${classes.headerNavItemRight}`}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
