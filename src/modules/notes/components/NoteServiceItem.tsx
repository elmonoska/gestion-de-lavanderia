import { FaTimes } from "react-icons/fa";
import { moneyFormat } from "../../../utils/money";
import useNoteServices from "../hooks/useNoteServices";
import type { SelectedService } from "../../../types/services";

type NoteServiceItem = {
  serviceItem: SelectedService;
};

export default function NoteServiceItem({ serviceItem }: NoteServiceItem) {
  // HOOKS
  const { deleteService } = useNoteServices();

  // VISTA
  return (
    <>
      <div
        key={serviceItem.service_id}
        className="grid grid-cols-[2fr_1fr_auto] gap-2 items-center border-b border-b-gray-200 py-2"
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-gray-900">
            <span className="font-semibold">{serviceItem.quantity} {serviceItem.unit}</span> - {serviceItem.service_name}: 
          </p>
        </div>
        <div className="">
          <p className="font-bold">{moneyFormat(serviceItem.total)}</p>
        </div>
        <FaTimes
          className="text-red-500 shrink-0"
          size={24}
          onClick={() => deleteService(serviceItem.service_id)}
        />
      </div>
    </>
  );
}
