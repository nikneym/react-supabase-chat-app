import { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

const SupabaseContext = createContext<SupabaseClient>(null);
export default SupabaseContext;
