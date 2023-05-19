import { createWebHistory, createRouter } from 'vue-router'
import { useDoctorStore } from '@/stores/doctor'

const doctorRouteModules = import.meta.globEager('../app/Doctor/**/routes/index.js')
const systemRouteModules = import.meta.globEager('../app/System/**/routes/index.js')

const routes = [
  {
    path: '/',
    redirect: '/home'
  }
]

for (const element in doctorRouteModules) {
  const routeModule = doctorRouteModules[element]
  if (routeModule['routes']) {
    routes.push(...routeModule['routes'])
  }
}

for (const element in systemRouteModules) {
  const routeModule = systemRouteModules[element]
  if (routeModule['routes']) {
    routes.push(
      ...routeModule['routes'].map((item) => {
        item.path = `/admin${item.path}`
        return item
      })
    )
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
  } else if (authType === 'system') {
  }
  next()
})

router.afterEach((to, from, failure) => {
  if (!failure) {
    window.document.title = to.meta.pageTitle ? `${to.meta.pageTitle} | Stroke` : 'Stroke'
  }
})

export default router
