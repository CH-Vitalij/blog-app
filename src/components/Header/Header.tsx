import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";
import { getUserData } from "../../features/UserData";
import { IUserData } from "../../types/userDataTypes";

const Header: React.FC = () => {
  const { username, image } = getUserData() as IUserData;

  const { auth, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(() => navigate("/"));
  };

  const handleCreateArticle = () => {
    navigate("profile");
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
              <Link to="profile">{username}</Link>
              <Avatar
                src={image}
                icon={<UserOutlined />}
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
