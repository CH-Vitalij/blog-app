import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { api, useGetUserQuery } from "../../service/api";
import { getToken } from "../../features/token";
import { skipToken } from "@reduxjs/toolkit/query/react";

import avatar from "../../assets/img/avatar.svg";
import classes from "./Header.module.scss";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Header: React.FC = () => {
  const { auth, signOut } = useAuth();
  const token = getToken() as string;
  const { data: fetchUserData } = useGetUserQuery(auth ? { token } : skipToken);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    signOut();
    dispatch(api.util.resetApiState()); //
  };

  return (
    <header className={`${classes.header}`}>
      <nav className={`${classes.headerNav}`}>
        <Link to="/" className={`${classes.headerNavItem} ${classes.headerNavItemRealWorld}`}>
          Realworld Blog
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "19px" }}>
          {auth ? (
            <>
              <Link
                className={`${classes.headerNavItem} ${classes.headerNavItemCreateArticle}`}
                to="new-article"
              >
                Create article
              </Link>
              <Link className={`${classes.headerNavItem}`} to="profile">
                <span className={`${classes.headerNavItemUsername}`}>
                  {fetchUserData?.user.username}
                </span>
                <Avatar
                  style={{ width: "46px", height: "46px" }}
                  src={fetchUserData?.user.image ?? avatar}
                  crossOrigin="anonymous"
                  size="large"
                  alt="avatar"
                />
              </Link>
              <Link
                className={`${classes.headerNavItem} ${classes.headerNavItemLogOut}`}
                to="/"
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
