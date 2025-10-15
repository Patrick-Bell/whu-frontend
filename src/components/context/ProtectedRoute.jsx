// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loader from "../loading/Loader";

const ProtectedRoute = ({ authenticated, children }) => {

  const { loading } = useAuth()

  if (loading) return <Loader />  // wait for auth check
  if (!authenticated) return <Navigate to="/" replace />;
  return children;
};


export default ProtectedRoute;
