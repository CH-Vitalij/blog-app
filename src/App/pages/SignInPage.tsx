import { Navigate } from "react-router-dom";
import SignIn from "../../components/SignIn";
import { useAuth } from "../../hooks/useAuth";

const SignInPage: React.FC = () => {
  const { auth } = useAuth();
  return auth ? <Navigate to="/" /> : <SignIn />;
};

export default SignInPage;
