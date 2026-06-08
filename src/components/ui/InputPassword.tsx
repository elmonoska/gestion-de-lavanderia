import { useState } from "react"
import { USER_FORM_RULES } from "../../constants/auth";
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import type { UseFormRegister } from "react-hook-form";

type InputPasswordProps = {
  isCurrent?: boolean;
  register: UseFormRegister<any>;
}
export default function InputPassword({isCurrent = true, register}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const PasswordIcon = showPassword ? FaEyeLowVision : FaEye;
  const rule = isCurrent ? USER_FORM_RULES.password : USER_FORM_RULES.newPassword;
  const inputId = isCurrent ? 'current-password' : 'new-password';
  const inputName = isCurrent ? 'password' : 'newPassword';

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        id={inputId}
        placeholder={rule.placeholder}
        className="w-full"
        {...register(inputName, rule)}
      />
      <PasswordIcon
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-500"
        size={24}
        onClick={() => setShowPassword(!showPassword)}
      />
    </div>
  );
}
