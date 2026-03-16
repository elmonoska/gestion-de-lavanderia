import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";
import Loading from "../components/ui/Loading";

export default function PrivateRoutes() {  
  const {session, loading} = useAuth();
  if (loading) return <Loading />
  if (session) {
    return <Outlet /> 
  } else {
    return <Navigate to={"/login"} />
  }
}
