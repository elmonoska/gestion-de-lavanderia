import type { APP_SCHEMA } from "../constants";
import type { NoteService } from "./notes";
import type { Tables } from "./supabase";

// servicios
export type Service = Tables<{schema: typeof APP_SCHEMA}, "services">;
export type NxMPromo = {buy: number; pay: number}
export type PercentPromo = {percent: number}
export type PromoRulesJson = {
  buy?: number;
  pay?: number;
  percent?: number;
}

export type SelectedService = Pick<Service, "unit"> 
  & Pick<
    NoteService,
    | "quantity"
    | "service_id"
    | "service_name"
    | "total"
    | "unit_price"
  > 
  & { note_id?: NoteService["id"]};
