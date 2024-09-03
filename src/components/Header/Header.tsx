import { Link, Location, useLocation, useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import { Button } from "antd";
import { useAuthContext } from "../../hooks/useAuthContext";

interface LocationStateHeader {
  userData: {
    username: string;
    email: string;
    token: string;
  };
}

const Header: React.FC = () => {
  const location = useLocation() as Location<LocationStateHeader>;
  console.log("userData", location.state?.userData);
  const { auth, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    try {
      signOut(() => navigate("/"));
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const handleCreateArticle = () => {
    navigate("profile", { state: { userData: location.state?.userData } });
  };

  return (
    <header className={`${classes.header}`}>
      <nav className={`${classes.headerNav}`}>
        <Link
          to="/"
          className={`${classes.headerNavItem}`}
          state={{ userData: location.state?.userData }}
        >
          Realworld Blog
        </Link>
        <div>
          {!auth ? (
            <Link to="login" className={`${classes.headerNavItem}`}>
              Sign In
            </Link>
          ) : null}
          {!auth ? (
            <Link
              to="register"
              className={`${classes.headerNavItem} ${classes.headerNavItemRight}`}
            >
              Sign Up
            </Link>
          ) : null}
          {auth ? <Button onClick={handleCreateArticle}>Create article</Button> : null}
          {auth ? (
            <Link to="profile" state={{ userData: location.state?.userData }}>
              {location.state?.userData?.username}
            </Link>
          ) : null}
          {auth ? <Button onClick={handleLogOut}>Log Out</Button> : null}
        </div>
      </nav>
    </header>
  );
};

export default Header;
