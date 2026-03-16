import type { APP_SCHEMA } from "../constants";
import type { Tables } from "./supabase";

// perfiles de usuario
export type Profile = Tables<{schema: typeof APP_SCHEMA}, "profiles">;
