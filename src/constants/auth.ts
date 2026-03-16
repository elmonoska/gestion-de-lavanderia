import { PATTERNS } from ".";
import type { FormRules } from "../types";

// tipos de roles
export const ROL_TYPES = [
  {id: 1, name: "administrador", value: "admin"},
  {id: 2, name: "empleado", value: "employee"},
  {id: 3, name: "pendiente", value: "pending"},
];

// reglas para react forms
export const USER_FORM_RULES: Record<"name" | "email" | "password" | "newPassword" | "rols", FormRules> = {
  name: {
    placeholder: "Nombre y apellido",
    required: "ingresa tu nombre",
    pattern: {
      value: PATTERNS.NAME,
      message: "usa solo letras (2 a 50 caracteres)"
    }
  },
  email: {
    placeholder: "nombre@ejemplo.com",
    required: "ingresa tu correo electronico",
    pattern: {
      value: PATTERNS.EMAIL,
      message: "correo invalido"
    },
  },
  password: {
    placeholder: "Contraseña123",
    required: "ingresa tu contraseña",
    validate: {
      minLength: (v) => /^.{8,}$/.test(String(v || "")) || "debe tener al menos 8 caracteres",
      hasUpper: (v) => /[A-Z]/.test(String(v || "")) || "debe tener al menos una mayuscula",
      hasLower: (v) => /[a-z]/.test(String(v || "")) || "debe tener al menos una minuscula",
      hasNumber: (v) => /\d/.test(String(v || "")) || "debe tener al menos un numero",
    }
  },
  newPassword: {
    placeholder: "ContraseñaNueva123",
    validate: {
      minLength: (v) => !v || /^.{8,}$/.test(String(v)) || "debe tener al menos 8 caracteres",
      hasUpper: (v) => !v || /[A-Z]/.test(String(v)) || "debe tener al menos una mayuscula",
      hasLower: (v) => !v || /[a-z]/.test(String(v)) || "debe tener al menos una minuscula",
      hasNumber: (v) => !v || /\d/.test(String(v)) || "debe tener al menos un numero",
    }
  },
  rols: {
    placeholder: "Rol de usuario",
    required: "selecciona un rol de usuario"
  }
};

