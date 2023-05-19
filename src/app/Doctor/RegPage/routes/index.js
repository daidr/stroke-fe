export const routes = [
  {
    path: '/reg',
    component: () => import('../RegPage.vue'),
    meta: {
      pageTitle: '注册',
      hideHeader: true
    }
  }
]
