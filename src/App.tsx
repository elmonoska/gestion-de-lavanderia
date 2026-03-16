import { Route, Routes } from "react-router-dom"
import Footer from "./components/layout/Footer"
import LoginPage from "./modules/auth/pages/LoginPage"
import NotesPage from "./modules/notes/pages/NotesPage"
import SignupPage from "./modules/auth/pages/SignupPage"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import PrivateLayout from "./components/layout/PrivateLayout"
import ServicesPage from "./modules/services/pages/ServicesPage"
import { ToastContainer } from "react-toastify"
import UsersPage from "./modules/users/pages/UsersPage"
import AdminRoutes from "./routes/AdminRoutes"
import ProfilePage from "./modules/profile/pages/ProfilePage"
import ForgotPasswordPage from "./modules/auth/pages/ForgotPasswordPage"
import UpdatePasswordPage from "./modules/auth/pages/UpdatePasswordPage"
import { NoteProvider } from "./modules/notes/contexts/NoteContext"
import ResumenPage from "./modules/resumen/pages/ResumenPage"

function App() {

  return (
    <>
    <div className="min-h-dvh flex flex-col">

      <Routes >
        <Route element={<PublicRoutes />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/recuperar-contraseña" element={<ForgotPasswordPage />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<PrivateLayout />}>
            <Route path="/notes" element={<NoteProvider><NotesPage /></NoteProvider>} />
            <Route path="/mi-perfil" element={<ProfilePage />} />
            <Route path="/cambiar-contraseña" element={<UpdatePasswordPage />} />
            <Route element={<AdminRoutes />}>
              <Route path="/" element={<ResumenPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      <Footer />
    </div>
    <ToastContainer />
    </>
  )
}

export default App


// elputoamo@dev.com #Contra123 admin
// elmonoska@outlook.com #Contra123 admin