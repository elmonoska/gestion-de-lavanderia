import supabase from "../modules/auth/utils/supabase";
import type { Profile } from "../types/auth";

export const fetchAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const toggleUserActive = async (user: Profile) => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ active: !user.active })
      .eq("id", user.id);
    if (error) {
      console.error(error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error)
    return false;
  }
}

