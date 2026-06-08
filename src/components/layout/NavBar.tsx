import { useState } from "react";
import { useAuth } from "../../modules/auth/hooks/useAuth"
import { APP_MENU } from "../../config/Menu";
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { BUSINESS_NAME } from "../../constants";
import UserCard from "./UserCard";


export default function NavBar() {
  // ESTADOS
  const [showMenu, setShowMenu] = useState(false);

  // HOOKS
  const {userProfile, signOut} = useAuth();

  // DERIVADOS
  const backMenuCondition = showMenu ? "visible opacity-100" : "invisible opacity-0"
  const menuCondition = showMenu ? "translate-x-0" : "translate-x-full";


  // FUNCIONES
  function toggleMenu() {
    setShowMenu(prev => !prev);
  }

  // VISTA
  return (
    <>
      <header className="sticky top-0 z-30 flex justify-around items-center p-4 text-white bg-sky-400 mb-4 shadow-md">
        <h1 className="uppercase font-bold text-xl md:text-2xl"><Link to="/">{BUSINESS_NAME}</Link></h1>
        <FaBars className="cursor-pointer text-3xl" title="abrir menu" onClick={toggleMenu} />
        <aside className={`fixed bg-black/80 inset-0 ${backMenuCondition} transition-all duration-300 flex justify-end text-black`} onClick={toggleMenu}>
          <nav className={`w-3/4 bg-slate-100 h-dvh p-4 flex flex-col gap-4 ${menuCondition} transition-all duration-300`} onClick={e=> e.stopPropagation()}>
            <FaTimes className="cursor-pointer self-end text-3xl" title="cerrar menu" onClick={toggleMenu} />

            <UserCard
              userName={userProfile?.name ||  "usuario"}
              rol={userProfile?.rol || "rol"} 
            />

            <Link
              to="/mi-perfil"
              className="w-fit mx-auto cursor-pointer text-sm capitalize text-gray-500 font-medium border-b border-transparent hover:text-sky-500 hover:border-sky-500 transition-all" 
              onClick={toggleMenu}
            >
                editar perfil
            </Link>


            <ul className="capitalize flex flex-col gap-6 grow font-semibold text-sm">
              {APP_MENU.map((menuItem, index) =>  {
                if (!menuItem.roles.includes(userProfile?.rol || "")) {
                  return;
                }
                const Icon = menuItem.icon;
                return (
                    <li className="" key={index}>
                      <Link to={menuItem.path} className="flex gap-2 items-center hover:text-white hover:bg-sky-400 transition-colors p-4 rounded-md" onClick={toggleMenu}><Icon size={24} /> {menuItem.name} </Link>
                    </li>
                )
              })}
            </ul>

            <button className="w-fit mx-auto cursor-pointer capitalize font-semibold p-4 pb-2 border-b-2 border-transparent hover:border-b-sky-400 transition-all" type="button" onClick={signOut}>cerrar sesion</button>
          </nav>
          
        </aside>
      </header>
    </>
  )
}
