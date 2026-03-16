import { useEffect } from "react";
import Modal from "../../../components/ui/Modal";
import { useForm } from "react-hook-form";
import { APP_SCHEMA} from "../../../constants";
import { toast } from "react-toastify";
import { createTemporalClient } from "../../auth/utils/supabase";
import InputMessage from "../../../components/ui/InputMessage";
import { ROL_TYPES, USER_FORM_RULES } from "../../../constants/auth";

type UserCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refreshUsers: () => void;
}

type CreateForm = {
  name: string;
  email: string;
  password: string;
  rol: string;
}

export default function UserCreateModal({isOpen, onClose, refreshUsers}: UserCreateModalProps) {
  // HOOKS
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm<CreateForm>({mode: "onTouched"});

  // FUNCIONES
  async function createUser(data: CreateForm) {
    const {email, name, password, rol} = data;
    const tempClient = createTemporalClient();
    
    // crea un usuario en supabase con la nueva sesion temporal
    const { data: responseData, error } = await tempClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          app_context: APP_SCHEMA,
          name,
          rol
        }
      }
    });

    if (error) {
      toast.error(`Error al crear usuario: ${error.message}`)
      console.error(error.message);
      return;
    }
    
    toast.success(`Usuario: ${name} - ${responseData.user?.email} creado con exito`);
    onClose();
    refreshUsers();
  }

  // EFECTOS
  // reinicia el formulario cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset]);

  // VISTA
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <form id="" className="" onSubmit={handleSubmit(createUser)}>
        <fieldset className="flex flex-col gap-4">
          <legend className="uppercase font-bold text-2xl mx-auto">crear usuario</legend>
          {/* NOMBRE */}
          <div className="">
            <label htmlFor="name" className="capitalize">nombre: </label>
            <input
              type="text"
              className="w-full"
              id="name"
              placeholder={USER_FORM_RULES.name.placeholder}
              {...register("name", USER_FORM_RULES.name)}
            />
            {errors.name && <InputMessage capitalize error message={errors.name.message} />}
          </div>

          {/* CORREO */}
          <div className="">
            <label htmlFor="email" className="capitalize">correo electronico: </label>
            <input
              type="text"
              className="w-full"
              id="email"
              placeholder={USER_FORM_RULES.email.placeholder}
              {...register("email", USER_FORM_RULES.email)}
            />
            {errors.email && <InputMessage capitalize error message={errors.email.message} />}
          </div>

          {/* CONTRASEÑA */}
          <div className="">
            <label htmlFor="password" className="capitalize">contraseña: </label>
            <input 
              type="password"
              className="w-full"
              id="password" 
              placeholder={USER_FORM_RULES.password.placeholder}
              {...register("password", USER_FORM_RULES.password)}
              />
            {errors.password && <InputMessage capitalize error message={errors.password.message} />}
          </div>

          {/* ROL */}
          <div className="">
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
            {errors.rol && <InputMessage capitalize error message={errors.rol.message} />}
          </div>

          <input
            type="submit"
            value="crear usuario"
            className=""
            disabled={!isValid}
          />
        </fieldset>
      </form>
    </Modal>
    </>
  )
}
