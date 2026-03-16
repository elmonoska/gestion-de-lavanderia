import UserCreateModal from "../components/UserCreateModal";
import UserEditModal from "../components/UserEditModal";
import useUser from "../hooks/useUser";

export default function UsersPage() {
  // HOOKS
  const {
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
  } = useUser();
  
  // VISTA
  return (
    <>
      <main className="flex flex-col gap-4 container mx-auto">
        <h2 className="capitalize text-2xl font-bold">lista de usuarios</h2>
        {/* FILTROS Y AGREGAR SERVICIO */}
        <section className="flex flex-col md:items-center md:flex-row gap-4">
          <button
            type="button"
            className="btn-primary text-nowrap"
            onClick={addUser}
          >
            agregar usuario
          </button>
          <input
            type="search"
            id="search"
            className="grow w-full md:w-auto placeholder:capitalize bg-white"
            placeholder="buscar servicio"
            onChange={searchUser}
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

        {/* TABLA DE SERVICIOS */}
        {/* LISTA DE SERVICIOS */}
        <section className="flex flex-col md:flex-row gap-4">
          {usersFiltered.map((user) => {
            return (
              <div
                className={`flex flex-col justify-center gap-2 p-4 rounded-md shadow-lg border ${user.active ? "bg-white border-transparent" : "bg-gray-50 border-gray-200"}`}
                key={user.id}
              >
                <div className="flex justify-between items-center gap-4">
                  <p
                    className={`font-bold text-lg ${user.active || "text-gray-400"}`}
                  >
                    {user.name}
                  </p>
                  <span
                    className={`capitalize font-bold text-xs rounded-full border py-1 px-2 ${user.active ? "bg-green-50 border-green-600 text-green-700" : "text-red-600"}`}
                  >
                    {user.active ? "activo" : "inactivo"}
                  </span>
                </div>

                <p className="font-medium text-xs text-gray-400">
                  {user.email}
                </p>

                <div className="flex gap-2">
                  <span
                    className={`uppercase text-sm font-semibold  rounded-md px-2 ${user.active ? "bg-indigo-100 text-indigo-600" : "bg-gray-200 text-gray-500"} `}
                  >
                    {user.rol}
                  </span>
                </div>

                <div className="flex justify-between gap-4 *:w-full *:py-2 *:rounded-md *:capitalize *:border *:font-semibold *:text-xs">
                  <button
                    type="button"
                    className="border-gray-400"
                    onClick={() => updateUser(user)}
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    className={`${user.active ? "text-red-500" : "bg-green-50 border-green-600 text-green-700"}`}
                    onClick={() => toggleUser(user)}
                  >
                    {user.active ? "desactivar" : "activar"}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <UserCreateModal
        isOpen={isCreateOpen}
        onClose={closeCreateModal}
        refreshUsers={getAllUsers}
      />
      <UserEditModal
        isOpen={isEditOpen}
        onClose={closeUpdateModal}
        user={editingProfile}
        refreshUsers={getAllUsers}
      />
    </>
  );
}
