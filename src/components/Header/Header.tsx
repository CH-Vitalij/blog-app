import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { useUserData } from "../../hooks/useUserData";
import { useLocationUserData } from "../../hooks/useLoactionUserData";

import avatar from "../../assets/img/avatar.svg";
import classes from "./Header.module.scss";

const Header: React.FC = () => {
  const { auth, signOut } = useAuth();
  const { data } = useUserData();
  const userData = useLocationUserData();

  const handleLogOut = () => {
    signOut();
  };

  return (
    <header className={`${classes.header}`}>
      <nav className={`${classes.headerNav}`}>
        <Link
          to="/"
          className={`${classes.headerNavItem} ${classes.headerNavItemRealWorld}`}
          state={{ userData }}
        >
          Realworld Blog
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "19px" }}>
          {auth ? (
            <>
              <Link
                className={`${classes.headerNavItem} ${classes.headerNavItemCreateArticle}`}
                to="new-article"
                state={{ userData }}
              >
                Create article
              </Link>
              <Link className={`${classes.headerNavItem}`} to="profile" state={{ userData }}>
                <span className={`${classes.headerNavItemUsername}`}>
                  {userData ? userData.username : data?.user.username}
                </span>
                <Avatar
                  style={{ width: "46px", height: "46px" }}
                  src={data?.user.image ? data?.user.image : avatar}
                  crossOrigin="anonymous"
                  size="large"
                  alt="avatar"
                />
              </Link>
              <Link
                className={`${classes.headerNavItem} ${classes.headerNavItemLogOut}`}
                to="/"
                state={{ userData }}
                onClick={handleLogOut}
              >
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link
                to="login"
                className={`${classes.headerNavItem} ${classes.headerNavItemSignIn}`}
              >
                Sign In
              </Link>
              <Link
                to="register"
                className={`${classes.headerNavItem} ${classes.headerNavItemSignUp}`}
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
