import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../components/context/AuthContex";

const ProtectedRoute = ({ component: Component, ...rest }: RouteProps) => {
  const authContext = useAuth();
  if (!authContext) return <Redirect to="/login" />;
  const { isAuthenticated } = authContext;
  return isAuthenticated ? (
    <Route component={Component} {...rest} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
