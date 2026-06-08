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
    serviceQuantity,
    handleChangeServiceQuantity,
    serviceTotal,
    handleChangeServiceTotal,
    addService,
    availableServices,
  } = useNoteServices();

  // VISTA
  return (
    <div className="flex flex-col gap-3">
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


      <div className="flex gap-2">
        <input
          type="number"
          inputMode="numeric"
          className="placeholder:capitalize min-w-0"
          placeholder="cantidad"
          value={serviceQuantity}
          onChange={handleChangeServiceQuantity}
        />
        <input
          type="number"
          inputMode="numeric"
          className="placeholder:capitalize min-w-0"
          placeholder="total"
          value={serviceTotal}
          onChange={handleChangeServiceTotal}
        />
      </div>

      <button
        type="button"
        className="uppercase p-2 rounded-md w-3/4 mx-auto border border-blue-500 text-blue-500"
        onClick={addService}
      >
        añadir servicio
      </button>

      {errorMessages.serviceQuantityError && (
        <InputMessage
          message={errorMessages.serviceQuantityError}
          capitalize
          error
        />
      )}
      {errorMessages.serviceTotalError && (
        <InputMessage
          message={errorMessages.serviceTotalError}
          capitalize
          error
        />
      )}
    </div>
  );
}
