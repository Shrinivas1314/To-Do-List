export default defineNuxtConfig({
  ssr: false, // Disable server-side rendering (using localStorage)
  app: {
    head: {
      title: "Nuxt To-Do List"
    }
  }
});