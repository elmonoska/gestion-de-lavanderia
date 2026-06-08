import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

const useNoteServices = () => {
  const {
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
  } = useContext(NoteContext);
  return {
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
    deleteService
  };
};
export default useNoteServices;
