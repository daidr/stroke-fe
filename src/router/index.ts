import { createWebHistory, createRouter } from 'vue-router'
import { useDoctorStore } from '@/stores/doctor'

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

router.beforeEach(async (to, from, next) => {
  const authType = to.meta.authType

  if (!authType) {
    next()
    return
  } else if (authType === 'doctor') {
    const doctorStore = useDoctorStore()
    if (!doctorStore.isLoggedIn) {
      const result = await doctorStore.refreshDoctorInfo()
      if (!result) {
        next({ path: '/login' })
        return
      }
    }
  }
  next()
})

router.afterEach((to, from, failure) => {
  if (!failure) {
    window.document.title = to.meta.pageTitle ? `${to.meta.pageTitle} | Stroke` : 'Stroke'
  }
})

export default router
