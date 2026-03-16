import useNote from "../hooks/useNote"
import NoteItem from "./NoteItem";

export default function NotesList() {
  // HOOKS
  const {notes} = useNote();
  
  // VISTA
  return (
    <>
    <section className="flex flex-col md:flex-row gap-4 flex-wrap md:gap-6 md:justify-start md:items-start md:max-w-6xl md:mx-auto">
      {notes.map(note => <NoteItem key={note.id} note={note} />)}
    </section>
    </>
  )
}
