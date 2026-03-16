import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

const useNoteServices = () => {
  const {
    selectedServiceId,
    handleChangeServiceId,
    quantityService,
    handleChangeServiceQuantity,
    availableServices,
    selectedServices,
    errorMessages,
    totalToPaid,
    resetStatesServices,
    addService,
    deleteService,
  } = useContext(NoteContext);
  return {
    selectedServiceId,
    handleChangeServiceId,
    quantityService,
    handleChangeServiceQuantity,
    availableServices,
    selectedServices,
    errorMessages,
    totalToPaid,
    resetStatesServices,
    addService,
    deleteService
  };
};
export default useNoteServices;
