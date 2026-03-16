import { FaPlus } from "react-icons/fa";
import NoteModal from "../components/NoteModal";
import useNote from "../hooks/useNote";
import NotesList from "../components/NotesList";
import useNoteModal from "../hooks/useNoteModal";
import InfiniteScroll from "../../../components/util/InfiniteScroll";
import Loading from "../../../components/ui/Loading";
import { NOTE_STATUS_OPTIONS_FILTER } from "../../../constants/notes";

export default function NotesPage() {
  // HOOKS
  const {
    handleChangeSearch,
    handleChangeShowInactives,
    showInactives,
    handleChangeStatus,
    status,
    getMoreNotes,
    isNotesLoading
  } = useNote();
  const {isNoteModalOpen, openModal, closeModal} = useNoteModal();

  // FUNCIONES
  const closeNoteModal = () => {
    closeModal();
  };

  const openNoteModal = () => {
    openModal();
  };

  // VISTA
  return (
    <>
      <main className="container mx-auto flex flex-col gap-4">
        <h2 className="capitalize text-2xl font-bold">Notas</h2>
        <section className="flex flex-col md:items-center md:flex-row gap-4">
          <input
            type="search"
            id="search"
            className="grow w-full md:w-auto placeholder:capitalize bg-white"
            placeholder="buscar servicio"
            onChange={handleChangeSearch}
          />
          <select className="bg-white capitalize" onChange={handleChangeStatus} value={status}>
            <option className="" value="" disabled>
              --- selecciona un estatus ---
            </option>
            {NOTE_STATUS_OPTIONS_FILTER.map(({ id, name, value }) => (
              <option key={id} value={value} className="">
                {name}
              </option>
            ))}
          </select>
          <div className="">
            <label className="cursor-pointer capitalize select-none text-sm text-gray-600 flex items-center justify-center gap-3">
              mostrar eliminadas
              <input
                type="checkbox"
                className="peer sr-only"
                onChange={handleChangeShowInactives}
                checked={showInactives}
              />
              <div className="rounded-full w-12 h-6  bg-gray-400 shadow-md peer-checked:bg-blue-400 after:content-[''] after:block after:bg-white after:w-6 after:h-6 after:rounded-full peer-checked:after:translate-x-full after:transition-all"></div>
            </label>
          </div>
        </section>
        
        <NotesList />

        {isNotesLoading && <Loading />}
        
        <InfiniteScroll onReachBottom={getMoreNotes} />

        <button
          type="button"
          id=""
          className="fixed bottom-4 right-4 rounded-full bg-blue-600 text-white p-2 cursor-pointer hover:bg-blue-700 transition-colors"
          title="agregar nota"
          onClick={openNoteModal}
        >
          <FaPlus size={42} />
        </button>
      </main>
      <NoteModal isOpen={isNoteModalOpen} onClose={closeNoteModal} />
    </>
  );
}
