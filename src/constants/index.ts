// app
export const APP_NAME = 'Demo Gestion de Lavanderia';
export const APP_SCHEMA = import.meta.env.VITE_APP_SCHEMA as "la_esponjita_laundry";
export const AUTHOR_NAME = "ElMonoSka";
export const START_DEV_YEAR = 2025;
export const ITEMS_PER_PAGE = 5;

// supabase
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// regex
export const PATTERNS = {
  NAME: /^[\p{L}\s.'-]{2,50}$/u,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  SERVICE_NAME: /^[\p{L}\s0-9.,'-]{2,50}$/u,
  COMMENTS: /^[\p{L}\d\s¿?¡!.,:;$%@#/()='"_+-]+$/u,
};
