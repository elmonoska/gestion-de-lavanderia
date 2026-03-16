import { FaTimes } from "react-icons/fa";
import { moneyFormat } from "../../../utils/money";
import { getPromoLabel } from "../../../utils/text";
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
          <p className="font-bold text-gray-900">{serviceItem.service_name}</p>

          <p className="text-sm text-gray-600 flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-gray-800">
              {serviceItem.quantity} {serviceItem.unit}
            </span>
            <span>x {moneyFormat(serviceItem.unit_price)}</span>

            {serviceItem.has_promo && (
              <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase">
                {getPromoLabel(serviceItem.promo_rules, serviceItem.promo_type)}
              </span>
            )}
          </p>
        </div>
        <div className="">
          {serviceItem.has_promo ? (
            <>
              <p className="text-gray-400 line-through text-sm">
                {moneyFormat(serviceItem.subTotal)}
              </p>
              <p className="font-bold">{moneyFormat(serviceItem.total)}</p>
              <p className="text-xs text-green-600">
                Ahorra {moneyFormat(serviceItem.discount)}
              </p>
            </>
          ) : (
            <p className="font-bold">{moneyFormat(serviceItem.total)}</p>
          )}
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
