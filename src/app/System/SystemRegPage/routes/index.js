export const routes = [
  {
    path: '/reg',
    component: () => import('../SystemRegPage.vue'),
    meta: {
      pageTitle: '管理面板注册',
      hideHeader: true
    }
  }
]
