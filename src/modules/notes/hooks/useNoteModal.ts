import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

const useNoteModal = () => {
  const {
    isNoteModalOpen,
    openModal,
    closeModal,
    sendNoteForm,
    editingNote,
    latestFolio,
  } = useContext(NoteContext);
  return {
    isNoteModalOpen,
    openModal,
    closeModal,
    sendNoteForm,
    editingNote,
    latestFolio,
  };
};
export default useNoteModal;
