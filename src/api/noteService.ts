import supabase from "../modules/auth/utils/supabase";
import type { Note } from "../types/notes";

export const getNoteServicesByNoteId = async (idNote: Note['id']) => {
  try {
    const {data, error} = await supabase
      .from("notes_services")
      .select()
      .eq("note_id", idNote)
    if (error) {
      return null
    }
    return data;
  } catch (error) {
    console.error(error)
    return null;
  }
}