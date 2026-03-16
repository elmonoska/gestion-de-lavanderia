import type { APP_SCHEMA } from "../constants";
import type { NOTE_STATUS } from "../constants/notes";
import type { Tables, TablesInsert } from "./supabase";

// notas
export type Note = Tables<{schema: typeof APP_SCHEMA}, 'notes'>;
export type NoteInsert = TablesInsert<{schema: typeof APP_SCHEMA}, "notes">
export type NoteStatus = typeof NOTE_STATUS[keyof typeof NOTE_STATUS];

// notes services
export type NoteService = Tables<{schema: typeof APP_SCHEMA}, "notes_services">
export type NoteServiceInsert = TablesInsert<{schema: typeof APP_SCHEMA}, "notes_services">
export type NewNoteService = Omit<NoteServiceInsert, "note_id">;

// campos del formulario de nota
export type NoteForm = {
  folio: string;
  client_name: string;
  client_phone?: string;
  delivery_date: string;
  delivery_time: string;
  deposit?: string;
  aditional_payments?: string;
  comments?: string;
  status?: string;
};