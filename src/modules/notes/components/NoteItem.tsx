import { NOTE_STATUS, NOTE_STATUS_LABELS, NOTE_STATUS_STYLES } from "../../../constants/notes";
import type { Note } from "../../../types/notes";
import { formatDateToDDMMYYHHMM } from "../../../utils/date";
import { moneyFormat } from "../../../utils/money";
import { useAuth } from "../../auth/hooks/useAuth";
import useNote from "../hooks/useNote";

type NoteItemProps = {
  note: Note;
};

export default function NoteItem({ note }: NoteItemProps) {
  // HOOKS
  const { toggleNote, editNote, markNoteAsPaid } = useNote();
  const { userProfile } = useAuth();

  // DERIVADOS
  const totalPaid = note.deposit + note.aditional_payments;
  const remaining = Math.max(note.total - totalPaid, 0);
  const canMarkAsPaid = userProfile?.rol === 'admin' && note.active && note.status === NOTE_STATUS.PENDING_PAYMENT;

  // VISTA
  return (
    <div
      className={`flex flex-col justify-evenly gap-2 p-4 rounded-md shadow-lg border md:w-[clamp(350px,350px,500px)] md:min-h-[400px] ${note.active ? "bg-white border-transparent" : "bg-gray-50 border-gray-200"}`}
      key={note.id}
    >
      <div className="flex justify-between items-center gap-4">
        <div className="">
          <p
            className={`font-bold text-lg ${note.active ? "" : "text-gray-400"}`}
          >
            {note.client_name}
          </p>
          <p
            className={`font-semibold text-sm ${note.active ? "" : "text-gray-400"}`}
          >
            N° de emisión #{note.folio}
          </p>
          {note.client_phone && (
            <p
              className={`font-semibold text-sm ${note.active ? "" : "text-gray-400"}`}
            >
              Telefono: {note.client_phone}
            </p>
          )}
        </div>

        <span
          className={`capitalize font-bold text-xs rounded-full border py-1 px-2 ${note.active ? "bg-green-50 border-green-600 text-green-700" : "text-red-600 bg-red-50"}`}
        >
          {note.active ? "activa" : "eliminada"}
        </span>
      </div>

      {/* totales */}
      <div className={`rounded-lg  ${note.active ? "" : "text-gray-400"}`}>
        <div className="flex justify-around">
          <div className="text-center p-2">
            <p className="font-bold text-xl">{moneyFormat(note.total)}</p>
            <p className="text-sm">Total</p>
          </div>
          {remaining > 0 && (
            <div className="text-center p-2">
              <p className="font-bold text-xl">{moneyFormat(remaining)}</p>
              <p className="text-sm">Restante</p>
            </div>
          )}
        </div>

        <hr className="border-0 h-px bg-gray-200 my-3"></hr>

        {note.deposit > 0 && (
          <div className="flex justify-between">
            <p className="">Anticipo:</p>
            <p className="font-bold">{moneyFormat(note.deposit)}</p>
          </div>
        )}
        {note.aditional_payments > 0 && (
          <div className="flex justify-between">
            <p className="">Pagos adicionales:</p>
            <p className="font-bold">{moneyFormat(note.aditional_payments)}</p>
          </div>
        )}
      </div>

      {/* informacion de entrega y comentarios*/}
      <div className="text-sm text-gray-500 flex flex-col">
        <p>
          Entrega:{" "}
          <span className="font-semibold">
            {formatDateToDDMMYYHHMM(
              `${note.delivery_date} ${note.delivery_time}`,
            )}
          </span>
        </p>
        {note.comments && (
          <p
            className={`p-1 rounded-lg font-semibold ${note.active ? "bg-blue-100 border-l-2 border-l-blue-500" : ""}`}
          >
            Nota: <span className="font-normal">{note.comments}</span>
          </p>
        )}
      </div>

      {/* status */}
      <div className="flex gap-2">
        <span
          className={`capitalize text-sm font-semibold  rounded-md px-2 ${note.active ? NOTE_STATUS_STYLES[note.status] : "bg-gray-100 text-gray-400"} `}
        >
          {NOTE_STATUS_LABELS[note.status]}
        </span>
      </div>

      {/* acciones */}
      <div className="flex gap-4 flex-wrap *:flex-1 *:w-full *:p-2 *:rounded-md *:capitalize *:border *:font-semibold *:text-xs">
        {note.active && (
          <button
            type="button"
            className="border-gray-400"
            onClick={() => editNote(note)}
          >
            editar
          </button>
        )}

        {userProfile?.rol === "admin" && (
          <button
            type="button"
            className={`${note.active ? "text-red-500 bg-red-50" : "bg-green-50 border-green-600 text-green-700"}`}
            onClick={() => toggleNote(note.id, note.active)}
          >
            {note.active ? "eliminar" : "activar"}
          </button>
        )}

        {canMarkAsPaid &&  (
          <button 
            type="button"
            className="min-w-full capitalize bg-blue-50 border border-blue-500 text-blue-500"
            onClick={() => markNoteAsPaid(note)}
          >
            marcar pagada
          </button>
        )}
      </div>

      {/* creacion y actualizacion */}
      <hr className="border-0 h-px bg-gray-200"></hr>
      <div className="text-xs text-gray-400">
        <p>
          Creado por: {note.created_by_name} -{" "}
          {formatDateToDDMMYYHHMM(note.created_at)}{" "}
        </p>
        {note.updated_at && (
          <p>
            Ultima actualización: {note.updated_by_name} -{" "}
            {formatDateToDDMMYYHHMM(note.updated_at)}
          </p>
        )}
      </div>
    </div>
  );
}
