import supabase from "../modules/auth/utils/supabase";
import type { Service } from "../types/services";

export const fetchAllServices = async () => {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchActiveServices = async () => {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("name", { ascending: true })
      .eq("active", true);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const toggleServiceActive = async (service: Service) => {
  try {
    const { error } = await supabase
      .from("services")
      .update({ active: !service.active })
      .eq("id", service.id);
    if (error) {
      console.error(error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
