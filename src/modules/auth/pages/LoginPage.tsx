import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import supabase from "../utils/supabase";
import InputMessage from "../../../components/ui/InputMessage";
import { useState } from "react";
import { USER_FORM_RULES } from "../../../constants/auth";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  // ESTADOS
  const [errorForm, setErrorForm] = useState("");

  // HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onTouched" });

  // FUNCIONES
  async function login(data: LoginForm) {
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(`Ocurrio un error al iniciar sesion: ${error.message}`);
      setErrorForm(`Ocurrio un error al iniciar sesion: ${error.message}`);
    }
  }

  // VISTA
  return (
    <>
      <div className="grow flex flex-col">
        <main className="grow grid place-content-center">
          <div className="w-full max-w-sm flex flex-col border border-gray-200 p-8 rounded-xl shadow-lg gap-4">
            <form
              className="flex flex-col max-w-sm"
              onSubmit={handleSubmit(login)}
            >
              <fieldset className="flex flex-col gap-4">
                <legend className="uppercase font-bold text-center">
                  login
                </legend>
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
                    placeholder={USER_FORM_RULES.email.placeholder}
                    className="w-full"
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
                    htmlFor="current-password"
                    className="text-sm font-semibold capitalize"
                  >
                    contraseña:{" "}
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    placeholder={USER_FORM_RULES.password.placeholder}
                    className="w-full"
                    {...register("password", USER_FORM_RULES.password)}
                  />

                  <Link
                    className="cursor-pointer text-sm text-sky-600 font-medium hover:text-sky-700 transition-colors inline-block w-full mt-2 underline text-end"
                    to="/recuperar-contraseña"
                  >
                    Olvide mi contraseña
                  </Link>

                  {errors.password && (
                    <InputMessage
                      capitalize
                      error
                      message={errors.password.message}
                    />
                  )}
                </div>

                {errorForm && (
                  <InputMessage message={errorForm} capitalize error />
                )}

                <input
                  type="submit"
                  value="ingresar"
                  className="w-full mt-4"
                  disabled={!isValid}
                />
              </fieldset>
            </form>
            <p className="">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/signup"
                className="text-sky-600 hover:text-sky-700 transition-colors underline text-sm font-semibold"
              >
                Crear cuenta
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
