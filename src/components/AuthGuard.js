import { Navigate } from "react-router-dom";
const AuthGuard = ({ children }) => {
  const isLoggedIn = localStorage.getItem("access_token");
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export default AuthGuard;
