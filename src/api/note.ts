import { ITEMS_PER_PAGE } from "../constants";
import { NOTE_STATUS } from "../constants/notes";
import supabase from "../modules/auth/utils/supabase";
import type { Profile } from "../types/auth";
import type { NewNoteService, Note, NoteInsert, NoteStatus } from "../types/notes";
import { formatDateForSupabase } from "../utils/date";

export const createNoteWithServices = async (newNote: NoteInsert, noteItems: NewNoteService[]) => {
  try {
    const {data, error} = await supabase.rpc("create_note_with_services", {note_data: newNote, services_data: noteItems})
    if (error) return null;
    return data;
  } catch (error) {
    console.error(error)
    return null;
  }
}

export const updateNoteWithServices = async (newNote: NoteInsert, noteItems: NewNoteService[]) => {
  try {
    const {data, error} = await supabase.rpc("update_note_and_services", {note_data: newNote, services_data: noteItems})
    if (error) return null;
    return data;
  } catch (error) {
    console.error(error)
    return null;
  }
}

export const fetchNotes = async (search: string, showInactives: boolean, status: NoteStatus, page: number
) => {
  try {
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    let query = supabase.from("notes").select("*");

    if (!showInactives) {
      query = query.eq("active", true);
    }

    if (status !== NOTE_STATUS.ALL) {
      query = query.eq("status", status)
    }

    if (search.trim()) {     
      if (!isNaN(Number(search))) {
        query = query.eq("folio", Number(search))
      }  else {
        query = query.or(`client_name.ilike.%${search}%,client_phone.ilike.%${search}%,comments.ilike.%${search}%`)
      }
    }

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const toggleNoteActive = async (noteId: Note['id'], noteActive: Note['active'], updatedUserId: Profile['id'], updatedUserName: Profile['name']) => {
  try {
    const {data, error} = await supabase
      .from('notes')
      .update({active: !noteActive, updated_at: formatDateForSupabase(new Date), updated_by_id: updatedUserId, updated_by_name: updatedUserName})
      .eq("id", noteId)
      .select()
      .single()
    if (error) {
      return null;
    }
    return data;
  } catch (error) {
    console.error(error)
    return null;
  }
}

export const fetchEarnings = async (from: string, to: string) => {
  try {

    const { data, error } = await supabase
      .from("notes")
      .select('id, deposit, aditional_payments')
      .gte("created_at", from)
      .lte("created_at", to)
      .eq("active", true);

    if (error) {
      console.error(error);
      return null;
    }

    const total = data.reduce((acc, note)=> acc += (note.deposit + note.aditional_payments), 0)
    return total;
    
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateNoteStatusById = async (noteId: Note['id'], newAditionalPayment: Note['aditional_payments']) => {
  try {
    const {data, error} = await supabase
      .from('notes')
      .update({status: NOTE_STATUS.PAID, aditional_payments: newAditionalPayment})
      .eq('id', noteId)
      .select()
      .single()

    if (error) {
      return null
    }
    return data;

  } catch (err) {
      console.error(err);
      return null;
  }
}
