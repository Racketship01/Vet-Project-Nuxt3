import useSupabase from "~/composables/useSupabase";
import type { iUpload } from "~/types/iUpload";
// import { QueryCategoryPet } from "~/types/queries";

export default defineEventHandler(async (event) => {
  try {
    const { supabase } = useSupabase();
    const body = (await readBody(event)) as iUpload;

    const filePath = `${body.path}/${body.name}`;

    const res = await fetch(body.file);
    const blob = await res.blob();

    const response = await supabase.storage
      .from("Pictures")
      .upload(filePath, blob, {
        contentType: body.type,
        upsert: true,
      });

    return {
      data: response.data,
      error: response.error?.message,
    };
  } catch (error: any) {
    return { error: error.message };
  }
});
