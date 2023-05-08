export const routes = [
  {
    path: '/home',
    component: () => import('../HomePage.vue'),
    meta: {
      pageTitle: '诊断列表',
      hideHeader: false
    }
  }
]
