export const routes = [
  {
    path: '/changepw',
    component: () => import('../ChangePasswordPage.vue'),
    meta: {
      authType: 'system',
      pageTitle: '修改密码'
    }
  }
]
