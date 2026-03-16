import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../../types/supabase";
import { APP_SCHEMA, SUPABASE_KEY, SUPABASE_URL } from "../../../constants";

// cliente principal
const supabase = createClient<Database, "la_esponjita_laundry">(
  SUPABASE_URL,
  SUPABASE_KEY,
  { db: { schema: APP_SCHEMA } },
);

// cliente temporal
export const createTemporalClient = () => {
  // crea otro cliente de supabase para no afectar al actual
  const supabase = createClient<Database, "la_esponjita_laundry">(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
      db: {
        schema: APP_SCHEMA,
      },
      // opciones para que el cliente temporal no persista, ni se inicie o afecte al principal
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );
  return supabase;
};

export default supabase;
