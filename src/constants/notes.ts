import { PATTERNS } from ".";
import type { FormRules } from "../types";
import type { NoteStatus } from "../types/notes";

// estados de las notas
export const NOTE_STATUS = {
  ALL: "all",
  PENDING_PAYMENT: "pending_payment",
  PAID: "paid",
  READY_FOR_PICKUP: "ready_for_pickup",
  DELIVERED: "delivered",
};

// opciones de estados de las notas para filtrado
export const NOTE_STATUS_OPTIONS_FILTER = [
  { id: 1, name: "Todas", value: NOTE_STATUS.ALL },
  { id: 2, name: "Pendientes de pago", value: NOTE_STATUS.PENDING_PAYMENT },
  { id: 3, name: "Pagadas", value: NOTE_STATUS.PAID },
  { id: 4, name: "Listas para entregar", value: NOTE_STATUS.READY_FOR_PICKUP },
  { id: 5, name: "Entregadas", value: NOTE_STATUS.DELIVERED },
];

// opciones del estado de una nota
export const NOTE_STATUS_OPTIONS = [
  { id: 1, name: "Pendiente de pago", value: NOTE_STATUS.PENDING_PAYMENT },
  { id: 2, name: "Pagada", value: NOTE_STATUS.PAID },
  { id: 3, name: "Lista para entregar", value: NOTE_STATUS.READY_FOR_PICKUP },
  { id: 4, name: "Entregada", value: NOTE_STATUS.DELIVERED },
];

// labels de los estados de las notas
export const NOTE_STATUS_LABELS: Record<Exclude<NoteStatus, "all">, string> = {
  pending_payment: "Pendiente de pago",
  paid: "Pagada",
  ready_for_pickup: "Lista para entregar",
  delivered: "Entregada",
}

// colores de los estados de las notas
export const NOTE_STATUS_STYLES: Record<NoteStatus, string> = {
  pending_payment: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  paid: "bg-green-100 text-green-700 border border-green-300",
  ready_for_pickup: "bg-blue-100 text-blue-700 border border-blue-300",
  delivered: "bg-gray-200 text-gray-700 border border-gray-300",
}

export const NOTE_FORM_RULES: Record<"folio" | "client_name" | "client_phone" | "delivery_date" | "delivery_time" | "deposit" | "comments" | "aditional_payments", FormRules> = {
  folio: {
    placeholder: "Numero de emision",
    required: "ingresa el numero de emision",
    maxLength: {
      value: 9,
      message: "el numero es demasiado grande"
    },
    validate: {
      isNumber: (v) => /^\d+$/.test(String(v || "")) || "debe ser un numero",
    }
  },
  client_name: {
    placeholder: "Nombre y apellido",
    required: "ingresa el nombre",
    pattern: {
      value: PATTERNS.NAME,
      message: "usa solo letras (2 a 50 caracteres)"
    }
  },
  client_phone: {
    placeholder: "Numero telefonico (opcional)",
    maxLength: {
      value: 10,
      message: "debe ser de 10 digitos"
    },
    validate: {
      isNumber: (v) => !v || /^\d+$/.test(String(v || "")) || "debe ser un numero",
    }
  },
  delivery_date: {
    required: "ingresa la fecha de entrega",
  },
  delivery_time: {
    required: "ingresa la hora de entrega",
  },
  deposit: {
    placeholder: "Cantidad (opcional)",
    maxLength: {
      value: 9,
      message: "el numero es demasiado grande"
    },
    validate: {
      isNumber: (v) => !v || /^\d+(\.\d+)?$/.test(String(v)) || "debe ser un numero válido",
    }
  },
  aditional_payments: {
    placeholder: "Cantidad (opcional)",
    maxLength: {
      value: 9,
      message: "el numero es demasiado grande"
    },
    validate: {
      isNumber: (v) => !v || /^\d+(\.\d+)?$/.test(String(v)) || "debe ser un numero válido",
    }
  },
  comments: {
    placeholder: "Opcional",
    pattern: {
      value: PATTERNS.COMMENTS,
      message: "usa solo letras, numeros y signos de puntuacion basicos"
    }
  },
}
