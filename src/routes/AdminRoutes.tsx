import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth"
import Loading from "../components/ui/Loading";

export default function AdminRoutes() {
  // HOOKS
  const {userProfile, loading} = useAuth();

  if (loading) return <Loading />;
  if (!userProfile) return <Loading />;
  
  if (userProfile?.rol !== "admin") {
    return <Navigate to="/notes" replace />
  } else {
    return <Outlet />
  }
}
