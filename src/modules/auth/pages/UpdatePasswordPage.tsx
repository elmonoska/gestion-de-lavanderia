import { useForm } from "react-hook-form";
import supabase from "../utils/supabase";
import { toast } from "react-toastify";
import InputMessage from "../../../components/ui/InputMessage";
import { useNavigate } from "react-router-dom";
import { USER_FORM_RULES } from "../../../constants/auth";

type UpdateForm = {
  password: string;
}

export default function UpdatePasswordPage() {
  // HOOKS
  const {register, handleSubmit, formState: {isValid, errors, isSubmitting}, reset} = useForm<UpdateForm>({mode: "onTouched"});
  const navigate = useNavigate();

  // FUNCIONES
  const updatePassword = async (data: UpdateForm) => {
    const {error} = await supabase.auth.updateUser({password: data.password});
    if (error) {
      console.error(`Ocurrio un problema al actualizar la contraseña: ${error.message}`);
      toast.error(`Ocurrio un problema al actualizar la contraseña: ${error.message}`);
      return;
    }

    toast.success("La contraseña se actualizo con exito");
    reset();
    setTimeout(() => {
      navigate("/");
    }, 2_000);
  }

  // VISTA
  return (
    <>
        <main className="flex flex-col items-center justify-center gap-4">
          <h1 className="uppercase font-bold text-2xl mx-auto">cambiar contraseña</h1>
          <div className="">
            <form className="flex flex-col max-w-sm gap-4" onSubmit={handleSubmit(updatePassword)}>
              <fieldset className="">
                <div className="">
                  <label htmlFor="password" className="capitalize">cambiar contraseña: </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full"
                    placeholder={USER_FORM_RULES.password.placeholder}
                    {...register("password", USER_FORM_RULES.password)}
                    disabled={isSubmitting}
                  />
                  {errors.password && <InputMessage message={errors.password.message} capitalize error />}
                </div>
              </fieldset>
              <input
                type="submit"
                value={isSubmitting ? "Cambiando" : "Cambiar contraseña"}
                className="" 
                disabled={!isValid || isSubmitting}
              />
            </form>
          </div>
        </main>
    </>
  )
}
