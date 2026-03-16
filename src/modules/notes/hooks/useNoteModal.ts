import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

const useNoteModal = () => {
  const {
    isNoteModalOpen,
    openModal,
    closeModal,
    sendNoteForm,
    editingNote,
  } = useContext(NoteContext);
  return {
    isNoteModalOpen,
    openModal,
    closeModal,
    sendNoteForm,
    editingNote
  };
};
export default useNoteModal;
