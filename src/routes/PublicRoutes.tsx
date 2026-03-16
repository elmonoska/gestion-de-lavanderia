import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

export default function PublicRoutes() {
  const {session} = useAuth();
  if (session) {
    return <Navigate to="/" />
  } else {
    return <Outlet />
  }
}
