export default defineNuxtRouteMiddleware((to) => {
  const { $isValid, $setAuth } = use$auth();
  const path = to.path;

  if (path.startsWith("/user") && !$isValid.value) {
    const redirectUrl = path.endsWith("/logout") ? undefined : to.fullPath;
    $setAuth(null);
    return navigateTo({ path: "/login", query: { _r: redirectUrl } });
  }
});
