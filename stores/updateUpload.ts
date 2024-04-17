import { defineStore } from "pinia";
import type { QueryCategoryPet } from "~/types/queries";

export const useUpdateUpload = defineStore("updateUpload", () => {
  const { slugCategory, slugPet } = useRoute().params as QueryCategoryPet;

  const uploadURL = ref("");

  const updateUpload = async () => {
    try {
      await $fetch(
        `/api/profile/category/${slugCategory}/pet/${slugPet}/updateUpload`,
        {
          method: "PUT",
          body: {
            uploadURL: uploadURL.value,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return { uploadURL, updateUpload };
});
