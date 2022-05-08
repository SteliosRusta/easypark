import { Redirect } from "react-router-dom";
import { useAuth } from "../components/context/AuthContex";
import Tabs from "../tabs/Home";

const ProtectedRoute: React.FC = () => {
  const authContext = useAuth();
  if (!authContext) return null;
  const { isAuthenticated } = authContext;
  return isAuthenticated ? <Tabs /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
