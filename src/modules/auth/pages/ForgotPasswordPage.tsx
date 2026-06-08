import { useForm } from "react-hook-form";
import supabase from "../utils/supabase";
import { toast } from "react-toastify";
import InputMessage from "../../../components/ui/InputMessage";
import { USER_FORM_RULES } from "../../../constants/auth";
import type { ForgotForm } from "../../../types/auth";

// crear la url absoluta para redirigir al cambio de contraseña
const redirectUrl = `${window.location.origin}/cambiar-contraseña`;

export default function ForgotPasswordPage() {
  // HOOKS
  const {register, handleSubmit, formState: {errors, isValid, isSubmitting}, reset} = useForm<ForgotForm>({mode: "onTouched"});

  // FUNCIONES
  const sendEmail = async (data: ForgotForm) => {
    const {error} = await supabase.auth.resetPasswordForEmail(data.email, {redirectTo: redirectUrl});
    if (error) {
      console.error(`Ocurrio un error al validar la informacion: ${error.message}`);
      toast.error(`Ocurrio un error al validar la informacion: ${error.message}`);
      return;
    }

    toast.success("Enlace enviado, revisa tu bandeja de correo y sigue el enlace para actualizar tu contraseña");
    reset();
  } 

  // VISTA
  return (
    <>
      <div className="grow grid place-content-center">
        <main className="">
          <div className="w-full max-w-sm flex flex-col border border-gray-200 p-8 rounded-xl shadow-lg gap-4">
            <h1 className="uppercase font-bold text-2xl mx-auto">recuperar contraseña</h1>
            <form className="flex flex-col max-w-sm gap-4" onSubmit={handleSubmit(sendEmail)}>
              <fieldset className="flex flex-col">

                {/* EMAIL */}
                <div className="">
                  <label htmlFor="email" className="capitalize">correo electronico: </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full"
                    placeholder={USER_FORM_RULES.email.placeholder}
                    {...register("email", USER_FORM_RULES.email)}
                    disabled={isSubmitting}
                  />
                  {errors.email && <InputMessage capitalize error message={errors.email.message} />}
                </div>

                <InputMessage message="Enviaremos a tu correo un enlace para cambiar tu contraseña" info />

              </fieldset>
              <input
                type="submit"
                value={isSubmitting ? "Enviando..." : "Enviar enlace"}
                className=""
                disabled={!isValid || isSubmitting}
              />
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
