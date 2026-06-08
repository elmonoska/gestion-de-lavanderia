import NoteServiceItem from "./NoteServiceItem";
import useNoteServices from "../hooks/useNoteServices";

export default function NotesServicesList() {
  // HOOKS
  const { selectedServices } = useNoteServices();

  // DEVIRADOS
  const hasServices = selectedServices.length > 0;

  // VISTA
  return (
    <>
      {hasServices ? (
        <div className="flex flex-col gap-2">
          {selectedServices.map((service) => (
            <NoteServiceItem key={service.service_id} serviceItem={service} />
          ))}
        </div>
      ) : (
        <p className="font-bold">No hay servicios seleccionados</p>
      )}
    </>
  );
}
