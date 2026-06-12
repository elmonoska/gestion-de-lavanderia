import { createContext, useMemo, useRef, type ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { fetchActiveServices } from "../../../api/services";
import { toast } from "react-toastify";
import {
  createNoteWithServices,
  fetchLastNoteFolio,
  fetchNotes,
  toggleNoteActive,
  updateNoteStatusById,
  updateNoteWithServices,
} from "../../../api/note";
import { useAuth } from "../../auth/hooks/useAuth";
import { getNoteServicesByNoteId } from "../../../api/noteService";
import { normalizeNumber } from "../../../utils/number";
import { normalizeText } from "../../../utils/text";
import type { NewNoteService, Note, NoteForm, NoteInsert, NoteStatus } from "../../../types/notes";
import type { SelectedService, Service } from "../../../types/services";
import { NOTE_STATUS } from "../../../constants/notes";

type NoteContextProps = {
  // LISTADO DE NOTAS Y FILTRADO
  notes: Note[];
  isNotesLoading: boolean;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showInactives: boolean;
  handleChangeShowInactives: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status: NoteStatus;
  handleChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  toggleNote: (id: Note["id"], active: Note["active"]) => void;
  editNote: (note: Note) => void;
  getMoreNotes: () => void;
  markNoteAsPaid: (note: Note) => void;
  // MODAL
  isNoteModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  sendNoteForm: (dataForm: NoteForm) => void;
  editingNote: Note | null;
  latestFolio: Note['folio'];
  // LISTADO DE SERVICIOS
  selectedServiceId: string;
  handleChangeServiceId: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  serviceTotal: string | number;
  handleChangeServiceTotal: (e: React.ChangeEvent<HTMLInputElement>) => void;
  serviceQuantity: string | number;
  handleChangeServiceQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  availableServices: Service[];
  selectedServices: SelectedService[];
  errorMessages: NoteModalErrorMessages;
  totalToPaid: number;
  resetStatesServices: () => void;
  addService: () => void;
  deleteService: (id: SelectedService["service_id"]) => void;
};

type NoteModalErrorMessages = {
  serviceIdError: string;
  serviceQuantityError: string;
  serviceTotalError: string;
};

const initialErrors: NoteModalErrorMessages = {
  serviceIdError: "",
  serviceQuantityError: "",
  serviceTotalError: "",
};

type NoteProviderProps = {
  children: ReactNode;
};

const NoteContext = createContext<NoteContextProps>(null!);

const NoteProvider = ({ children }: NoteProviderProps) => {
  // HOOKS
  const { userProfile } = useAuth();
  /**
   * LISTADO DE NOTAS Y FILTRADO
   */
  const [notes, setNotes] = useState<Note[]>([]);
  const [isNotesLoading, setIsNotesLoading] = useState(false);
  const [searchNote, setSearchNote] = useState("");
  const [showInactives, setShowInactives] = useState(false);
  const [status, setStatus] = useState<NoteStatus>("all");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const page = useRef(1);
  const hasMore = useRef(true);
  const isFetching = useRef(false);
  /**
   * MODAL
   */
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [latestFolio, setLatestFolio] = useState<Note['folio']>(0);
  /**
   * LISTADO DE SERVICIOS
   */
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [serviceQuantity, setServiceQuantity] = useState("");
  const [serviceTotal, setServiceTotal] = useState("");
  const [activeServices, setActiveServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    [],
  );
  const [errorMessages, setErrorMessages] =
    useState<NoteModalErrorMessages>(initialErrors);
  const totalToPaid = useMemo(
    () => selectedServices.reduce((acc, service) => acc + service.total, 0),
    [selectedServices],
  );
  const availableServices = useMemo(()=> {
    const existingIds = new Set(selectedServices.map(service => service.service_id))
    const filtered = activeServices.filter(service => !existingIds.has(service.id))
    return filtered
  },[activeServices, selectedServices])

  /**
   * LISTA DE NOTAS Y FILTRADO
   */
  const resetPagination = () => {
    setIsNotesLoading(true)
    page.current = 1;
    hasMore.current = true;
    setNotes([]);
  };

  // actualiza el estado de busqueda y reinicia la paginacion
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetPagination();
    setSearchNote(e.currentTarget.value);
  };

  // actualiza el estado de mostrar inactivos y reinicia la paginacion
  const handleChangeShowInactives = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    resetPagination();
    setShowInactives(e.currentTarget.checked);
  };

  // actualiza el estado de status y reinicia la paginacion
  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    resetPagination();
    setStatus(e.currentTarget.value);
  };

  // obtiene las notas iniciales y las siguientes cuando la pagina incremente
  const getMoreNotes = useCallback(async () => {
    if (!hasMore.current || isFetching.current) {
      setIsNotesLoading(false)
      return;
    };

    isFetching.current = true;
    try {
      setIsNotesLoading(true)
      const data = await fetchNotes(
        searchNote,
        showInactives,
        status,
        page.current,
      );

      if (data === null) {
        toast.error("Ocurrió un error al obtener las notas");
        return;
      }

      if (data.length === 0) {
        hasMore.current = false;
      }

      setNotes((prev) => {
        const existingIds = new Set(prev.map((note) => note.id));
        const filtered = data.filter((note) => !existingIds.has(note.id));
        return [...prev, ...filtered];
      });

      page.current++;
    } catch (err) {
      console.error(err);
    } finally {
      isFetching.current = false;
      setIsNotesLoading(false);
    }
  }, [searchNote, showInactives, status]);

  // desactiva o activa una nota
  const toggleNote = useCallback(
    async (id: Note["id"], active: Note["active"]) => {
      if (!userProfile) return;
      const data = await toggleNoteActive(
        id,
        active,
        userProfile?.id,
        userProfile.name,
      );
      if (!data) {
        toast.error("Ocurrio un error al eliminar la nota");
        return;
      }
      toast.success("La nota se elimino correctamente");
      setNotes((prev) =>
        prev.map((note) => (note.id === data.id ? data : note)),
      );
    },
    [userProfile],
  );

  // marca una nota como pagada en base a su id
  const markNoteAsPaid = async (note: Note) => {
    const totalPaid = note.deposit + note.aditional_payments;
    const remaining = note.total - totalPaid;
    const newAditionalPayment = remaining + note.aditional_payments;

    const data = await updateNoteStatusById(note.id, newAditionalPayment);
    if (!data) {
      toast.error('Ocurrio un error al actualizar la nota');
      return;
    }

    toast.success('La nota se marco como pagada');
    setNotes(prev => prev.map(note => note.id === data.id ? data : note));
  }

  // obtiene las notas cuando los filtros cambian despues de 1sg
  useEffect(() => {
    const timeOut = setTimeout(() => {
      getMoreNotes();
    }, 1_000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [searchNote, showInactives, status, getMoreNotes]);

  /**
   * MODAL
   */
  // cierra el modal y reinicia los estados de servicios
  const closeModal = () => {
    setIsNoteModalOpen(false);
    resetStatesServices();
  };

  // abre el modal
  const openModal = async () => {
    const data = await fetchLastNoteFolio();
    if (!data) {
      toast.error('Ocurrio un error al obtener el folio de la última nota');
    }
    setLatestFolio(data ?? 0);
    setIsNoteModalOpen(true);
  };

  // crea la nota en la bd con la informacion del formulario y crea los servicios de la nota tambien
  const createNote = async (
    newNote: NoteInsert,
    newNoteServices: NewNoteService[],
  ) => {
    const response = await createNoteWithServices(newNote, newNoteServices);
    if (response === null) {
      toast.error("Ocurrio un error al crear la nota");
      return;
    }
    toast.success("La nota se creo correctamente");
    closeModal();
    setNotes((prev) => [response, ...prev]);
  };

  // actualiza la nota en la bd con la informacion del formulario y actualiza los servicios de la nota tambien
  const updateNote = async (
    newNote: NoteInsert,
    newNoteServices: NewNoteService[],
  ) => {
    const response = await updateNoteWithServices(newNote, newNoteServices);
    if (response === null) {
      toast.error("Ocurrio un error al actualizar la nota");
      return;
    }
    toast.success("La nota se actualizo correctamente");
    closeModal();
    setNotes((prev) =>
      prev.map((note) => (note.id === response.id ? response : note)),
    );
  };

  // procesa la informacion del formulario para crear o actualizar una nota
  const sendNoteForm = (dataForm: NoteForm) => {
    if (!userProfile) {
      toast.error("Ocurrio un error al crear la nota");
      console.error("No hay usuario logeado");
      return;
    }

    const normalizedFolio = normalizeNumber(dataForm.folio);
    const normalizedDeposit = normalizeNumber(dataForm.deposit);

    const baseNote = {
      folio: normalizedFolio,
      client_name: dataForm.client_name,
      client_phone: normalizeText(dataForm.client_phone),
      delivery_date: dataForm.delivery_date,
      delivery_time: dataForm.delivery_time,
      deposit: normalizedDeposit,
      comments: normalizeText(dataForm.comments),
      total: totalToPaid,
    };

    // si se actualiza una nota
    if (editingNote) {
      const normalizedAditionalPayments = normalizeNumber(dataForm.aditional_payments);
      const totalPaid = normalizedDeposit + normalizedAditionalPayments;

      let status = dataForm.status ?? "";
      if (dataForm.status === NOTE_STATUS.PENDING_PAYMENT) {
        status = totalPaid >= totalToPaid
            ? NOTE_STATUS.PAID
            : NOTE_STATUS.PENDING_PAYMENT
      }
      const notePayload = {
        ...baseNote,
        id: editingNote.id,
        updated_by_id: userProfile.id,
        updated_by_name: userProfile.name,
        aditional_payments: normalizedAditionalPayments,
        status,
        created_by_id: editingNote.created_by_id,
        created_by_name: editingNote.created_by_name,
      };
      updateNote(notePayload, selectedServices);

      // si se crea una nota
    } else {
      const notePayload = {
        ...baseNote,
        created_by_id: userProfile.id,
        created_by_name: userProfile.name,
        status:
          normalizedDeposit >= totalToPaid
            ? NOTE_STATUS.PAID
            : NOTE_STATUS.PENDING_PAYMENT,
      };
      createNote(notePayload, selectedServices);
    }
  };

  // establece la nota que se va editar y obtiene sus servicios
  const editNote = async (note: Note) => {
    const responseNoteServices = await getNoteServicesByNoteId(note.id);
    if (!responseNoteServices) {
      toast.error("Ocurrio un error al obtener los servicios de la nota");
      return;
    }

    setSelectedServices([]);

    // crea un mapa con la informacion de un servicio disponible en base a su id
    const servicesMap = Object.fromEntries(availableServices.map(service => [service.id, service]))
    
    const normalizeNoteServices = responseNoteServices
      .map(
        (service) => {

          const findService = servicesMap[service.service_id];
          if (!findService) {
            console.error(
              "El servicio de la nota no se encuentra en la lista de servicios activos",
            );
            return;
          }
          return {
            service_id: service.service_id,
            service_name: service.service_name,
            quantity: service.quantity,
            total: service.total,
            unit: findService.unit,
            unit_price: service.unit_price,
            note_id: service.note_id,
          };
        },
      )
      .filter((noteService) => noteService !== undefined);

    setEditingNote(note);
    setSelectedServices(normalizeNoteServices);
    setIsNoteModalOpen(true);
  };

  /**
   * LISTADO DE SERVICIOS
   */
  // asigna el id del servicio seleccionado
  const handleChangeServiceId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServiceId(e.currentTarget.value);
  }

  // cambia la cantidad del servicio seleccionado
  const handleChangeServiceQuantity = (e: React.ChangeEvent<HTMLInputElement>) => setServiceQuantity(e.currentTarget.value)

  // cambia el total del servicio seleccionado
  const handleChangeServiceTotal = (e: React.ChangeEvent<HTMLInputElement>) => setServiceTotal(e.currentTarget.value)

  // resetea los estados de los servicios
  const resetStatesServices = useCallback(() => {
    setEditingNote(null);
    setSelectedServiceId("");
    setServiceTotal("");
    setSelectedServices([]);
    setErrorMessages(initialErrors);
  }, []);

  // agrega un servicio a la lista de seleccionados
  const addService = () => {
    let hasError = false;
    setErrorMessages(initialErrors);

    // valida si el servicio seleccionado existe en los servicios activos
    const findService = availableServices?.find((service) => service.id === selectedServiceId);
    if (!findService) {
      hasError = true;
      setErrorMessages((prev) => ({
        ...prev,
        serviceIdError: "Debes seleccionar un servicio",
      }));
    }

    // valida la cantidad del servicio
    if (!serviceQuantity || Number(serviceQuantity) <= 0 || Number(serviceQuantity) >= 999) {
      hasError = true;
      setErrorMessages((prev) => ({
        ...prev,
        serviceQuantityError: "La cantidad debe ser entre 1 y 998",
      }));
    }

    // valida el total del servicio
    if (!serviceTotal || Number(serviceTotal) <= 0 || Number(serviceTotal) >= 99_999) {
      hasError = true;
      setErrorMessages((prev) => ({
        ...prev,
        serviceTotalError: "El total debe ser entre 1 y 99,999",
      }));
    }
    // si hubo errores no agrega el servicio a la lista de servicios seleccionados
    if (hasError || !findService) return;

    const { id, price, unit } = findService;

    // valida si el servicio seleccionado ya se encuentra en la lista de servicios seleccionados
    const serviceExists = selectedServices.some((service) => service.service_id === selectedServiceId);
    if (serviceExists) {
      setErrorMessages((prev) => ({
        ...prev,
        serviceIdError: "El servicio ya esta agregado",
      }));
      return;
    }

    // construye el servicio que se va añadir
    const newService = {
      quantity: Number(serviceQuantity),
      service_id: id,
      service_name: findService.name,
      total: Number(serviceTotal),
      unit_price: price,
      unit,
    }
    // añade el servicio
    setSelectedServices((prev) => [...prev, newService]);

    // limpia los estados para permitir agregar uno nuevo en blanco
    setSelectedServiceId("");
    setServiceQuantity("");
    setServiceTotal("");
    setErrorMessages(initialErrors);
  };

  // elimina un servicio de la lista de seleccionados
  const deleteService = (id: SelectedService["service_id"]) =>
    setSelectedServices((prev) =>
      prev.filter((service) => service.service_id !== id),
    );

  // obtiene el listado los servicios activos
  useEffect(() => {
    const getActiveServices = async () => {
      const data = await fetchActiveServices();
      if (data === null) {
        toast.error("Ocurrio un error al obtener los servicios activos");
        return;
      } else {
        setActiveServices(data);
      }
    };
    getActiveServices();
  }, []);


  const value = {
    // LISTADO DE NOTAS Y FILTRADO
    notes,
    isNotesLoading,
    handleChangeSearch,
    showInactives,
    handleChangeShowInactives,
    status,
    handleChangeStatus,
    toggleNote,
    editNote,
    getMoreNotes,
    markNoteAsPaid,
    // MODAL
    isNoteModalOpen,
    openModal,
    closeModal,
    sendNoteForm,
    editingNote,
    latestFolio,
    // LISTADO DE SERVICIOS
    selectedServiceId,
    handleChangeServiceId,
    serviceQuantity,
    handleChangeServiceQuantity,
    serviceTotal,
    handleChangeServiceTotal,
    availableServices,
    selectedServices,
    errorMessages,
    totalToPaid,
    resetStatesServices,
    addService,
    deleteService,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export { NoteContext, NoteProvider };
