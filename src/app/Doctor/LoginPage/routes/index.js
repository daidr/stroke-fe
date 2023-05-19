export const routes = [
  {
    path: '/login',
    component: () => import('../LoginPage.vue'),
    meta: {
      pageTitle: '登录',
      hideHeader: true
    }
  }
]
