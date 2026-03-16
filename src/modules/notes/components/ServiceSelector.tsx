import { FaPlus } from "react-icons/fa";
import InputMessage from "../../../components/ui/InputMessage";
import { moneyFormat } from "../../../utils/money";
import { getPromoLabel } from "../../../utils/text";
import useNoteServices from "../hooks/useNoteServices";

export default function ServiceSelector() {
  // HOOKS
  const {
    handleChangeServiceId,
    selectedServiceId,
    errorMessages,
    quantityService,
    handleChangeServiceQuantity,
    addService,
    availableServices,
  } = useNoteServices();

  // VISTA
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        className="first-letter:uppercase w-full"
        onChange={handleChangeServiceId}
        value={selectedServiceId}
      >
        <option value="" disabled>
          --- Selecciona un servicio ---
        </option>
        {availableServices?.map((service) => (
          <option key={service.id} value={service.id} className="">
            {service.name} - {moneyFormat(service.price)} / {service.unit}{" "}
            {service.has_promo &&
              `(${getPromoLabel(service.promo_rules, service.promo_type)})`}
          </option>
        ))}
      </select>
      {errorMessages.serviceIdError && (
        <InputMessage message={errorMessages.serviceIdError} capitalize error />
      )}
      <input
        type="number"
        inputMode="numeric"
        className="placeholder:capitalize grow"
        placeholder="cantidad"
        value={quantityService}
        onChange={handleChangeServiceQuantity}
      />
      <button
        type="button"
        className="btn-primary rounded-full! shrink-0"
        onClick={addService}
      >
        <FaPlus size={20} />
      </button>
      {errorMessages.serviceQuantityError && (
        <InputMessage
          message={errorMessages.serviceQuantityError}
          capitalize
          error
        />
      )}
    </div>
  );
}
