import { createClient } from "@supabase/supabase-js";

const useSupabase = () => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SERVICE_KEY
  );
  return {
    supabase,
  };
};
export default useSupabase;
