import { Link, Location, useLocation, useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import { Avatar, Button } from "antd";
import { useAuth } from "../../hooks/useAuth";

import avatar from "../../assets/img/avatar.svg";
import { useUserData } from "../../hooks/useUserData";

interface LocationStateHeader {
  userData: {
    username: string;
    email: string;
    token: string;
  };
}

const Header: React.FC = () => {
  const { auth, signOut } = useAuth();
  const { data } = useUserData();
  const location = useLocation() as Location<LocationStateHeader>;
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(() => navigate("/", { state: { userData: location.state?.userData } }));
  };

  const handleCreateArticle = () => {
    navigate("new-article", { state: { userData: location.state?.userData } });
  };

  return (
    <header className={`${classes.header}`}>
      <nav className={`${classes.headerNav}`}>
        <Link to="/" className={`${classes.headerNavItem}`}>
          Realworld Blog
        </Link>
        <div>
          {auth ? (
            <>
              <Button onClick={handleCreateArticle}>Create article</Button>
              <Link to="profile" state={{ userData: location.state?.userData }}>
                {location.state?.userData ? location.state?.userData.username : data?.user.username}
              </Link>
              <Avatar
                style={{ width: "46px", height: "46px" }}
                src={data?.user.image ? data?.user.image : avatar}
                crossOrigin="anonymous"
                size="large"
                alt="avatar"
              />
              <Button onClick={handleLogOut}>Log Out</Button>
            </>
          ) : (
            <>
              <Link to="login" className={`${classes.headerNavItem}`}>
                Sign In
              </Link>
              <Link
                to="register"
                className={`${classes.headerNavItem} ${classes.headerNavItemRight}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
