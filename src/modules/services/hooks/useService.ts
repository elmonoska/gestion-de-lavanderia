import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAllServices, toggleServiceActive } from "../../../api/services";
import { toast } from "react-toastify";
import type { Service } from "../../../types/services";

export const useService = () => {
  // ESTADOS
  const [search, setSearch] = useState("");
  const [showInactives, setShowInactives] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);

  // MEMOIZACIONES
  const servicesFiltered = useMemo(() => {
    if (!allServices) return [];
    return (
      allServices
        .filter((service) =>
          service.name.toLowerCase().includes(search.toLowerCase()),
        )
        // si showInactives es true devuelve el servicio, si no devuelve solo si el servicio esta activo
        .filter((service) => (showInactives ? true : service.active))
    );
  }, [allServices, search, showInactives]);

  // FUNCIONES
  const searchService = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleShowInactives = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowInactives(e.target.checked);
  };

  const addService = () => {
    setEditingService(null);
    setIsServiceModalOpen(true);
  };

  const updateService = (service: Service) => {
    setEditingService(service);
    setIsServiceModalOpen(true);
  };

  const getAllServices = useCallback(async () => {
    const data = await fetchAllServices();
    if (data === null) {
      toast.error("Ocurrio un error al obtener todos los servicios");
      return;
    } else {
      setAllServices(data);
    }
  }, []);

  async function toggleService(service: Service) {
    const isSuccess = await toggleServiceActive(service);
    if (isSuccess) {
      toast.success(`Servicio actualizado con exito`);
      getAllServices();
    } else {
      toast.error("Ocurrio un error al actualizar el servicio");
    }
  }

  function closeModal() {
    setIsServiceModalOpen(false);
    getAllServices();
  }

  // EFECTOS
  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  // VISTA
  return {
    searchService,
    showInactives,
    isServiceModalOpen,
    editingService,
    servicesFiltered,
    toggleShowInactives,
    addService,
    updateService,
    toggleService,
    closeModal,
  };
};
