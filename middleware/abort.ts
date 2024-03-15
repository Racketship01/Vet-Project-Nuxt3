/* eslint-disable space-before-function-paren */
export default defineNuxtRouteMiddleware(async (to) => {
  // const meta = await $fetch("/api/profile/meta", {
  //     method: "GET",
  //   });

  // let meta;
  // const { data: meta } = await useAsyncData("middleware", () =>
  //   $fetch("/api/profile/meta", {
  //     method: "GET",
  //   })
  // );

  // meta = data;

  const meta = useMeta();

  const category = meta.value.categories.find(
    (category: any) => category.slugCategory === to.params.slugCategory
  );

  if (!category) {
    return abortNavigation(
      createError({
        statusCode: 404,
        message: "Category not found",
      })
    );
  }

  const pet = category.pets.find(
    (pet: any) => pet.slugPet === to.params.slugPet
  );

  if (!pet) {
    return abortNavigation(
      createError({
        statusCode: 404,
        message: "Pet not found",
      })
    );
  }

  return undefined;
});
