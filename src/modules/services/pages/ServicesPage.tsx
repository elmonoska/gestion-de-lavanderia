import ServiceModal from "../components/ServiceModal";
import { moneyFormat } from "../../../utils/money";
import { useService } from "../hooks/useService";
import { getPromoLabel } from "../../../utils/text";

export default function ServicesPage() {
  // HOOKS
  const {
    searchService,
    toggleShowInactives,
    showInactives,
    addService,
    servicesFiltered,
    updateService,
    toggleService,
    isServiceModalOpen,
    closeModal,
    editingService,
  } = useService();

  // VISTA
  return (
    <>
      <main className="container mx-auto flex flex-col gap-4">
        <h2 className="capitalize text-2xl font-bold">lista de servicios</h2>
        {/* FILTROS Y AGREGAR SERVICIO */}
        <section className="flex flex-col md:items-center md:flex-row gap-4">
          <button type="button" className="btn-primary text-nowrap" onClick={addService}>
            agregar servicio
          </button>
            <input
              type="search"
              id="search"
              className="grow w-full md:w-auto placeholder:capitalize bg-white"
              placeholder="buscar servicio"
              onChange={searchService}
            />
            <div className="">
              <label className="cursor-pointer capitalize select-none text-sm text-gray-600 flex items-center justify-center gap-3">
                mostrar inactivos
                <input
                  type="checkbox"
                  className="peer sr-only"
                  onChange={toggleShowInactives}
                  checked={showInactives}
                />
                <div className="rounded-full w-12 h-6  bg-gray-400 shadow-md peer-checked:bg-blue-400 after:content-[''] after:block after:bg-white after:w-6 after:h-6 after:rounded-full peer-checked:after:translate-x-full after:transition-all"></div>
              </label>
            </div>
        </section>

        {/* LISTA DE SERVICIOS */}
        <section className="flex flex-col md:flex-row gap-4 flex-wrap justify-around">
          {servicesFiltered.map((service) => {
            return (
              <div
                className={`flex flex-col justify-center gap-2 p-4 rounded-md shadow-lg border ${service.active ? "bg-white border-transparent" : "bg-gray-50 border-gray-200"}`}
                key={service.id}
              >
                <div className="flex justify-between items-center gap-4">
                  <p
                    className={`font-bold text-lg ${service.active || "text-gray-400"}`}
                  >
                    {service.name}
                  </p>
                  <span
                    className={`capitalize font-bold text-xs rounded-full border py-1 px-2 ${service.active ? "bg-green-50 border-green-600 text-green-700" : "text-red-600"}`}
                  >
                    {service.active ? "activo" : "inactivo"}
                  </span>
                </div>

                <p
                  className={`font-semibold ${service.active || "text-gray-400"}`}
                >
                  {moneyFormat(service.price)}
                </p>

                <div className="flex gap-2">
                  <span
                    className={`uppercase text-sm font-semibold  rounded-md px-2 ${service.active ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"} `}
                  >
                    {service.unit}
                  </span>
                  {service.has_promo && (
                    <span
                      className={`text-sm font-semibold rounded-md px-2 ${service.active ? "bg-amber-100 text-orange-500" : "bg-gray-200 text-gray-500"} `}
                    >
                      {getPromoLabel(service.promo_rules, service.promo_type)}{" "}
                      🔥
                    </span>
                  )}
                </div>

                <div className="flex justify-between gap-4 *:w-full *:py-2 *:rounded-md *:capitalize *:border *:font-semibold *:text-xs">
                  <button
                    type="button"
                    className="border-gray-400"
                    onClick={() => updateService(service)}
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    className={`${service.active ? "text-red-500" : "bg-green-50 border-green-600 text-green-700"}`}
                    onClick={() => toggleService(service)}
                  >
                    {service.active ? "desactivar" : "activar"}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={closeModal}
        service={editingService}
      />
    </>
  );
}
