export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (user.value && to.path === "/profile") {
    return;
  }
  return navigateTo("/");
});
