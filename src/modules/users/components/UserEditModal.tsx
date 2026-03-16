import { useForm } from "react-hook-form";
import Modal from "../../../components/ui/Modal";
import InputMessage from "../../../components/ui/InputMessage";
import { useEffect } from "react";
import supabase from "../../auth/utils/supabase";
import { toast } from "react-toastify";
import type { Profile } from "../../../types/auth";
import { ROL_TYPES, USER_FORM_RULES } from "../../../constants/auth";

type UserEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: Profile | null;
  refreshUsers: () => void;
}

type EditForm = {
  name: string;
  rol: string;
  email: string;
  active: boolean;
}

export default function UserEditModal({isOpen, onClose, user, refreshUsers}: UserEditModalProps) {
  // HOOKS
  const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<EditForm>({mode: "onTouched"});

  // FUNCIONES
  async function updateUser(data: EditForm) {
    if (!user) return;
    const {active, name, email, rol} = data;
    const {error} = await supabase
                      .from("profiles")
                      .update({active, name, email, rol})
                      .eq("id", user.id );
    if (error) {
      toast.error(`Ocurrio un error al actualizar el usuario ${error.message}`);
      console.error(`Ocurrio un error al actualizar el usuario ${error.message}`);
      return;
    }

    toast.success(`El usuario: ${name} - ${email} se actualizo con exito`);
    refreshUsers();
    reset();
    onClose();
  }

  // EFECTOS
  useEffect(() => {
    if (user) {
      reset({
        "name": user.name,
        "rol": user.rol || "pending",
        "email": user.email,
        "active": user.active || false
      })
    }
  }, [user, reset]);

  // VISTA
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form id="" className="" onSubmit={handleSubmit(updateUser)}>
          <fieldset className="flex flex-col gap-4">
            <legend className="uppercase font-bold text-2xl mx-auto">actualizar usuario</legend>
            {/* NOMBRE */}
            <div className="">
              <label htmlFor="name" className="capitalize">nombre: </label>
              <input
                type="text"
                id="name"
                className="w-full" 
                placeholder={USER_FORM_RULES.name.placeholder}
                {...register("name", USER_FORM_RULES.name)}
              />
            {errors.name && <InputMessage capitalize error message={errors.name.message} />}
            
            </div>
            
            {/* ROL Y ACTIVE */}
            <div className="flex justify-between gap-4">
              <div className="grow">
                <label htmlFor="rols">Rol: </label>
                <select
                  id="rols"
                  className="w-full capitalize"
                  defaultValue=""
                  {...register("rol", USER_FORM_RULES.rols)}
                >
                  <option value="" disabled hidden>{USER_FORM_RULES.rols.placeholder}</option>
                  {ROL_TYPES.map(rol => (
                    <option key={rol.id} value={rol.value}>{rol.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col justify-between">
                <span className="capitalize">activo: </span>
                <label className="cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    {...register("active")}
                  />
                  <div className="rounded-full w-12 h-6  bg-gray-400 shadow-md peer-checked:bg-blue-400 after:content-[''] after:block after:bg-white after:w-6 after:h-6 after:rounded-full peer-checked:after:translate-x-full after:transition-all"></div>
                </label>
              </div>
            </div>

            {/* CORREO */}
            <div className="">
              <input
                type="email"
                className="w-full text-gray-500 bg-gray-100"
                disabled readOnly 
                {...register("email")}
              />
              <InputMessage 
                info
                message="Si hubo un error al escribir el correo, elimina este usuario y crealo nuevamente, el correo no puede modificarse por seguridad"
              />
            </div>

            <input
              type="submit"
              value="actualizar usuario"
              className="" 
              disabled={!isValid}
            />
          </fieldset>
        </form>
      </Modal>
    </>
  )
}
