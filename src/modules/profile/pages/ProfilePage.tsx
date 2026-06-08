import { useForm } from "react-hook-form";
import UserCard from "../../../components/layout/UserCard";
import { useAuth } from "../../auth/hooks/useAuth"
import InputMessage from "../../../components/ui/InputMessage";
import { useEffect } from "react";
import supabase from "../../auth/utils/supabase";
import { toast } from "react-toastify";
import type { UserAttributes } from "@supabase/supabase-js";
import { USER_FORM_RULES } from "../../../constants/auth";
import InputPassword from "../../../components/ui/InputPassword";

type ProfileForm = {
  name: string;
  email: string;
  newPassword: string;
}

export default function ProfilePage() {
  // HOOKS
  const {userProfile} = useAuth();
  const {register, formState: {errors, isValid, isDirty}, reset, handleSubmit} = useForm<ProfileForm>({mode: "onTouched"});

  // FUNCIONES
  const updateProfile = async (data: ProfileForm) => {
    const {email, name, newPassword} = data;
    const attributes : UserAttributes = {data: {name}}

    // verificar si el email es el mismo al anterior, si es diferente lo agrega para cambiarlo
    if (userProfile?.email && userProfile.email !== email) {
      attributes.email = email;
    }

    // solo cambia la contraseña si se escribio una nueva
    if (newPassword) {
      attributes.password = newPassword;
    }

    const {error: errorUser} = await supabase.auth.updateUser(attributes);
    if (errorUser) {
      toast.error(`Ocurrio un error al actualizar el usuario ${errorUser.message}`);
      console.error(`Ocurrio un error al actualizar el usuario ${errorUser.message}`);
      return;
    }

    if (userProfile) {
      console.log(userProfile.id)
      const {error: errorProfile} = await supabase.from("profiles")
                        .update({name, email})
                        .eq("id", userProfile.id);
      if (errorProfile) {
        toast.error(`Ocurrio un error al actualizar el perfil ${errorProfile.message}`);
        console.error(`Ocurrio un error al actualizar el perfil ${errorProfile.message}`);
        return;
      }
    }

    toast.success("Se actualizo tu usuario correctamente");
  }

  // EFECTOS
  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name,
        email: userProfile.email,
        newPassword: "",
        
      });
    }
  }, [userProfile, reset]);

  // VISTA
  return (
    <>
      <main className="flex flex-col gap-4 p-4 container mx-auto">
        <UserCard 
          userName={userProfile?.name || "usuario"}
          rol={userProfile?.rol || "rol"}
        />

        <form id="" className="flex flex-col gap-4 items-center" onSubmit={handleSubmit(updateProfile)}>
          <fieldset className="w-full md:w-1/2 flex flex-col gap-4">
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
              {errors.name && <InputMessage message={errors.name.message} error />}
            </div>

            {/* EMAIL */}
            <div className="">
              <label htmlFor="email" className="capitalize">correo electronico: </label>
              <input
                type="email"
                id="email"
                className="w-full"
                placeholder={USER_FORM_RULES.email.placeholder}
                {...register("email", USER_FORM_RULES.email)}
              />
            </div>

            {/* NUEVA CONTRASEÑA */}
            <div className="">
              <label htmlFor="new-password" className="capitalize">nueva contraseña: </label>
              <InputPassword register={register} isCurrent={false} />
            </div>
          </fieldset>
          <input
            type="submit"
            value="actualizar perfil"
            className="w-fit" 
            disabled={!isValid || !isDirty}
          />
        </form>
        
      </main>
    </>
  )
}
