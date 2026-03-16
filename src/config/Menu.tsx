import {FaBox, FaReceipt, FaUser} from "react-icons/fa"
import { MdSpaceDashboard } from "react-icons/md";

type MenuItem = {
  name: string;
  path: string;
  icon: React.ElementType;
  roles: string[]
}

export const APP_MENU: MenuItem[] = [
  {
    icon: MdSpaceDashboard,
    name: "resumen",
    path: "/",
    roles: ["admin"]
  },
  {
    icon: FaReceipt,
    name: "notas",
    path: "/notes",
    roles: ["admin", "employee"]
  },
  {
    icon: FaBox,
    name: "gestion de servicios",
    path: "/services",
    roles: ["admin"]
  },
  {
    icon: FaUser,
    name: "gestion de usuarios",
    path: "/users",
    roles: ["admin"]
  },
  // {
  //   icon: FaCalculator,
  //   name: "control de gastos",
  //   path: "/",
  //   roles: ["admin"]
  // },
]