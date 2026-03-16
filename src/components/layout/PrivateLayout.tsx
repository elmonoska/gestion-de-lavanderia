import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function PrivateLayout() {
  return (
    <>
      <NavBar />
      <div className="grow mt-4 p-4 md:p-2">
        <Outlet />
      </div>
    </>
  )
}
