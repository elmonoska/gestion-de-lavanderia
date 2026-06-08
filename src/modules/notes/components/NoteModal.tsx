import { useForm } from "react-hook-form";
import Modal from "../../../components/ui/Modal";
import InputMessage from "../../../components/ui/InputMessage";
import { useCallback, useEffect } from "react";
import ServiceSelector from "./ServiceSelector";
import NotesServicesList from "./NotesServicesList";
import useNoteModal from "../hooks/useNoteModal";
import useNoteServices from "../hooks/useNoteServices";
import { moneyFormat } from "../../../utils/money";
import { NOTE_FORM_RULES, NOTE_STATUS_OPTIONS } from "../../../constants/notes";
import type { NoteForm } from "../../../types/notes";

type NoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NoteModal({ isOpen, onClose }: NoteModalProps) {
  // HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm<NoteForm>({ mode: "onTouched" });

  const { sendNoteForm, editingNote } = useNoteModal();
  const { selectedServices, totalToPaid } = useNoteServices();

  // MANEJADORES
  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);


  // DERIVADOS
  const actionFormTitle = editingNote ? "actualizar nota" : "crear nota";

  const actionFormButton = isSubmitted
    ? editingNote
      ? "actualizando..."
      : "creando..."
    : editingNote
      ? "actualizar"
      : "crear";

  // EFECTOS
  // rellena el formulario con la informacion de una nota si se esta editando
  useEffect(() => {
    if (editingNote) {
      reset({
        folio: String(editingNote.folio),
        client_name: editingNote.client_name,
        client_phone: editingNote.client_phone ?? "",
        delivery_date: editingNote.delivery_date,
        delivery_time: editingNote.delivery_time,
        deposit: String(editingNote.deposit),
        aditional_payments: String(editingNote.aditional_payments),
        comments: editingNote.comments ?? "",
        status: editingNote.status,
      });
    } else {
      reset({
        folio: "",
        client_name: "",
        client_phone: "",
        delivery_date: "",
        delivery_time: "",
        deposit: "",
        aditional_payments: "",
        comments: "",
        status: ""
      });
    }
  }, [editingNote, reset]);

  // resetea el formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // VISTA
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(sendNoteForm)}
        >
          <fieldset className="flex flex-col gap-4">
            <legend className="uppercase font-bold text-2xl mx-auto">
              {actionFormTitle}
            </legend>
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            {/* FOLIO */}
            <div className="">
              <label htmlFor="folio" className="capitalize">
                folio:{" "}
              </label>
              <input
                type="text"
                id="folio"
                className="w-full"
                inputMode="numeric"
                placeholder={NOTE_FORM_RULES.folio.placeholder}
                {...register("folio", NOTE_FORM_RULES.folio)}
              />
              {errors.folio && (
                <InputMessage message={errors.folio.message} error capitalize />
              )}
            </div>

            {editingNote && (
              <div className="">
                <label htmlFor="status" className="">
                  Estatus:
                </label>
                <select
                  className="bg-white capitalize w-full"
                  {...register("status")}
                >
                  <option className="" value="" disabled>
                    --- selecciona un estatus ---
                  </option>
                  {NOTE_STATUS_OPTIONS.map(({ id, name, value }) => (
                    <option key={id} value={value} className="">
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* NOMBRE CLIENTE */}
            <div className="">
              <label htmlFor="client_name" className="capitalize">
                nombre de cliente:{" "}
              </label>
              <input
                type="text"
                id="client_name"
                className="w-full"
                placeholder={NOTE_FORM_RULES.client_name.placeholder}
                {...register("client_name", NOTE_FORM_RULES.client_name)}
              />
              {errors.client_name && (
                <InputMessage
                  message={errors.client_name.message}
                  error
                  capitalize
                />
              )}
            </div>

            {/* TELEFONO CLIENTE */}
            <div className="">
              <label htmlFor="client_phone" className="capitalize">
                telefono de cliente:{" "}
              </label>
              <input
                type="text"
                id="client_phone"
                className="w-full"
                inputMode="numeric"
                placeholder={NOTE_FORM_RULES.client_phone.placeholder}
                {...register("client_phone", NOTE_FORM_RULES.client_phone)}
              />
              {errors.client_phone && (
                <InputMessage
                  message={errors.client_phone.message}
                  error
                  capitalize
                />
              )}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-2 min-w-0">
            {/* AGREGACION DE SERVICIOS */}
            <ServiceSelector />

            {/* LISTADO DE SERVICIOS */}
            <NotesServicesList />
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            {/* FECHA DE ENTREGA */}
            <div className="">
              <label htmlFor="delivery_date" className="capitalize">
                fecha de entrega:{" "}
              </label>
              <input
                type="date"
                id="delivery_date"
                className="w-full"
                placeholder={NOTE_FORM_RULES.delivery_date.placeholder}
                {...register("delivery_date", NOTE_FORM_RULES.delivery_date)}
              />
              {errors.delivery_date && (
                <InputMessage
                  message={errors.delivery_date.message}
                  error
                  capitalize
                />
              )}
            </div>

            {/* HORA DE ENTREGA */}
            <div className="">
              <label htmlFor="delivery_time" className="capitalize">
                hora de entrega:{" "}
              </label>
              <input
                type="time"
                id="delivery_time"
                className="w-full"
                placeholder={NOTE_FORM_RULES.delivery_time.placeholder}
                {...register("delivery_time", NOTE_FORM_RULES.delivery_time)}
              />
              {errors.delivery_time && (
                <InputMessage
                  message={errors.delivery_time.message}
                  error
                  capitalize
                />
              )}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            {/* ANTICIPO */}
            <div className="">
              <label htmlFor="deposit" className="capitalize">
                anticipo:{" "}
              </label>
              <input
                type="text"
                id="deposit"
                className="w-full"
                inputMode="numeric"
                placeholder={NOTE_FORM_RULES.deposit.placeholder}
                {...register("deposit", NOTE_FORM_RULES.deposit)}
              />
              {errors.deposit && (
                <InputMessage
                  message={errors.deposit.message}
                  error
                  capitalize
                />
              )}
            </div>

            {/* PAGOS ADICIONALES */}
            {editingNote && (
              <div className="">
                <label htmlFor="aditional_payments" className="capitalize">
                  pagos adicionales:{" "}
                </label>
                <input
                  type="text"
                  id="aditional_payments"
                  className="w-full"
                  inputMode="numeric"
                  placeholder={NOTE_FORM_RULES.aditional_payments.placeholder}
                  {...register(
                    "aditional_payments",
                    NOTE_FORM_RULES.aditional_payments,
                  )}
                />
                {errors.aditional_payments && (
                  <InputMessage
                    message={errors.aditional_payments.message}
                    error
                    capitalize
                  />
                )}
              </div>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            {/* COMENTARIOS */}
            <div className="">
              <label htmlFor="comments" className="capitalize">
                comentarios:{" "}
              </label>
              <textarea
                id="comments"
                className="w-full"
                placeholder={NOTE_FORM_RULES.comments.placeholder}
                {...register("comments", NOTE_FORM_RULES.comments)}
              ></textarea>
              {errors.comments && (
                <InputMessage
                  message={errors.comments.message}
                  error
                  capitalize
                />
              )}
            </div>
          </fieldset>

          {selectedServices && (
            <p className="">
              Total a pagar:{" "}
              <span className="font-bold">{moneyFormat(totalToPaid)}</span>
            </p>
          )}

          <input
            type="submit"
            value={actionFormButton}
            className="w-full"
            // disabled={!isValid || isSubmitted ||  selectedServices.length === 0}
            disabled={!isValid || selectedServices.length === 0}
          />
        </form>
      </Modal>
    </>
  );
}
