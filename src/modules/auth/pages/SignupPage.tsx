import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import supabase from "../utils/supabase";
import { toast } from "react-toastify";
import InputMessage from "../../../components/ui/InputMessage";
import { USER_FORM_RULES } from "../../../constants/auth";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  // hooks
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<SignupForm>({ mode: "onTouched" });

  // funciones y manejadores
  async function registerUser(data: SignupForm) {
    const { email, name, password } = data;
    const { data: dataResponse, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      console.error(`Hubo un error al crear la cuenta: ${error}`);
      toast.error(error.message);
      return;
    }

    console.log(dataResponse);
    toast.success("usuario creado");
    reset();
  }

  // vista
  return (
    <>
      <main className="grow grid place-content-center">
        <div className="w-full max-w-sm flex flex-col border border-gray-200 p-8 rounded-xl shadow-lg gap-4">
          <form
            className="flex flex-col max-w-sm"
            onSubmit={handleSubmit(registerUser)}
          >
            <fieldset className="flex flex-col gap-4">
              <legend className="uppercase font-bold text-center">
                crear cuenta
              </legend>

              <div className="">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold capitalize"
                >
                  nombre:{" "}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full"
                  placeholder={USER_FORM_RULES.name.placeholder}
                  {...register("name", USER_FORM_RULES.name)}
                />
                {errors.name && (
                  <InputMessage
                    capitalize
                    error
                    message={errors.name.message}
                  />
                )}
              </div>

              <div className="">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold capitalize"
                >
                  correo electronico:{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full"
                  placeholder={USER_FORM_RULES.email.placeholder}
                  {...register("email", USER_FORM_RULES.email)}
                />
                {errors.email && (
                  <InputMessage
                    capitalize
                    error
                    message={errors.email.message}
                  />
                )}
              </div>

              <div className="">
                <label
                  htmlFor="new-password"
                  className="text-sm font-semibold capitalize"
                >
                  contraseña:{" "}
                </label>
                <input
                  type="password"
                  id="new-password"
                  autoComplete="new-password"
                  className="w-full"
                  placeholder={USER_FORM_RULES.password.placeholder}
                  {...register("password", USER_FORM_RULES.password)}
                />
                {errors.password && (
                  <InputMessage
                    capitalize
                    error
                    message={errors.password.message}
                  />
                )}
              </div>

              <input
                type="submit"
                value="crear cuenta"
                className="w-full mt-4"
                disabled={!isValid}
              />
            </fieldset>
          </form>
          <div className="">
            <p className="">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-sky-600 hover:text-sky-700 transition-colors underline text-sm font-semibold"
              >
                Iniciar sesion
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
