import { createWebHistory, createRouter } from 'vue-router'

const routeModules = import.meta.globEager('../app/**/routes/index.js')

const routes = [
  {
    path: '/',
    redirect: '/home'
  }
]

for (const element in routeModules) {
  const routeModule = routeModules[element]
  if (routeModule['routes']) {
    routes.push(...routeModule['routes'])
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to, from, failure) => {
  if (!failure) {
    window.document.title = to.meta.pageTitle ? `${to.meta.pageTitle} | Stroke` : 'Stroke'
  }
})

export default router
