import { createContext, useEffect, useState, type ReactNode } from "react";
import supabase from "../utils/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { Profile } from "../../../types/auth";
import { toast } from "react-toastify";


type AuthContextProps = {
  loading: boolean,
  session: Session | null;
  user: User | null;
  userProfile: Profile | null;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>(null!);

function AuthProvider({children}: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // obtiene la informacion de la sesion del usuario
    async function getUserInfo() {
      const {data: {session}} = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        setUser(session.user);
        setLoading(false)
        getUserProfile(session.user.id);
      }
    }
    getUserInfo();

    // obtiene la informacion del perfil del usuario
    async function getUserProfile(userId : User['id']) {
      const {data, error} = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (data && !error) {
        // si el usuario tiene rol pendiente lo saca de la sesion inmediatamente hasta una aprobacion del administrador
        if (data.rol === "pending") {
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
          toast.success("Tu cuenta se creo correctamente pero necesita aprobacion del administrador")
          return;
        }
        
        // si el usuario esta desactivado cierra su sesion
        if (!data.active) {
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
          toast.error("Tu cuenta esta desactivada, contacta al administrador")
          return;
        }

        setUserProfile(data)
      } else {
        console.error("Error al obtener perfil", error.message)
      }
    }

    // escucha por los cambios de sesion (login / logout)
    const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      // si hay sesion busca la informacion de perfil del usuario
      if (session) {
        getUserProfile(session.user.id);
      } else {
        setUserProfile(null)
      }
    })
    
    return () => subscription.unsubscribe();
  }, []);

  // funcion para salir de la sesion actual
  async function signOut() {
    await supabase.auth.signOut();
  }

  const value = {
    loading,
    session,
    user,
    userProfile,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}
