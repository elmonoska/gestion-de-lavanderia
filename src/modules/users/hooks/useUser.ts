import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { fetchAllUsers, toggleUserActive } from "../../../api/users";
import type { Profile } from "../../../types/auth";

const useUser = () => {
  // ESTADOS
  const [allUsers, setAllUsers] = useState<Profile[] | null>(null);
  const [search, setSearch] = useState("");
  const [showInactives, setShowInactives] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  // MEMOIZACIONES
  const usersFiltered = useMemo(() => {
    if (!allUsers) return [];
    return (
      allUsers
        .filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase()),
        )
        // si showInactives es true devuelve el usuario, si no devuelve solo si el usuario esta activo
        .filter((user) => (showInactives ? true : user.active))
    );
  }, [allUsers, search, showInactives]);

  // FUNCIONES
  const getAllUsers = useCallback(async () => {
    const data = await fetchAllUsers();
    if (data === null) {
      toast.error("Ocurrio un error al obtener todos los usuarios");
      return;
    } else {
      setAllUsers(data); 
    }
  }, []);

  function searchUser(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function toggleShowInactives(e: React.ChangeEvent<HTMLInputElement>) {
    setShowInactives(e.target.checked);
  }

  async function toggleUser(user: Profile) {
    const isSuccess = await toggleUserActive(user);
    if (isSuccess) {
      toast.success("Usuario actualizado con exito");
      getAllUsers();
    } else {
      toast.error("Ocurrio un error al actualizar el usuario");
    }
  }

  function addUser() {
    setEditingProfile(null);
    setIsCreateOpen(true);
  }

  function closeCreateModal() {
    setIsCreateOpen(false);
  }

  function updateUser(user: Profile) {
    setIsEditOpen(true);
    setEditingProfile(user);
  }

  function closeUpdateModal() {
    setEditingProfile(null);
    setIsEditOpen(false);
  }

  // EFECTOS
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return {
    addUser,
    searchUser,
    toggleShowInactives,
    showInactives,
    usersFiltered,
    updateUser,
    toggleUser,
    isCreateOpen,
    closeCreateModal,
    getAllUsers,
    isEditOpen,
    closeUpdateModal,
    editingProfile,
  };
};
export default useUser;
