import { PATTERNS } from ".";
import type { FormRules } from "../types";

export const SERVICE_FORM_RULES: Record<"name", FormRules> = {
  name: {
    placeholder: "Nombre del servicio",
    required: "ingresa el nombre del servicio",
    pattern: {
      value: PATTERNS.SERVICE_NAME,
      message: "usa solo letras y numeros"
    } 
  }
}
