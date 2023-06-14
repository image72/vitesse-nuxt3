// export default defineNuxtRouteMiddleware((to, _from) => {
//   const user = useStrapiUser()
//   const user = useSupabaseUser()
//   if (!user.value) {
//     useCookie('redirect', { path: '/' }).value = to.fullPath
//     return navigateTo('/login')
//   }
// })
// definePageMeta({
//   middleware: 'auth'
// })