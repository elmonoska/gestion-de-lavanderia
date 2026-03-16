import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

const useNote = () => {
  const {
    notes,
    isNotesLoading,
    handleChangeSearch,
    showInactives,
    handleChangeShowInactives,
    status,
    handleChangeStatus,
    toggleNote,
    editNote,
    getMoreNotes,
  } = useContext(NoteContext);
  return {
    notes,
    isNotesLoading,
    handleChangeSearch,
    showInactives,
    handleChangeShowInactives,
    status,
    handleChangeStatus,
    toggleNote,
    editNote,
    getMoreNotes,
  };
};
export default useNote;
