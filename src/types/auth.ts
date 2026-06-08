import type { APP_SCHEMA } from "../constants";
import type { Tables } from "./supabase";

// perfiles de usuario
export type Profile = Tables<{schema: typeof APP_SCHEMA}, "profiles">;

// tipado de formularios
export type LoginForm = {
  email: string;
  password: string;
};

export type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export type ForgotForm = {
  email: string;
}

export type UpdateForm = {
  password: string;
}
