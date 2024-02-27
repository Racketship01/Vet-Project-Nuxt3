/* eslint-disable space-before-function-paren */
export default defineNuxtRouteMiddleware(async (to) => {
  //const meta = await $fetch("/api/profile/meta");

  let meta;
  const { data } = await useAsyncData("middleware", () =>
    $fetch("/api/profile/meta")
  );

  meta = data;

  const category = meta.categories.find(
    (category) => category.slugCategory === to.params.slugCategory
  );

  if (!category) {
    return abortNavigation(
      createError({
        statusCode: 404,
        message: "Category not found",
      })
    );
  }

  const pet = category.pets.find((pet) => pet.slugPet === to.params.slugPet);

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
