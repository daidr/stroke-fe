export const routes = [
  {
    path: '/changepw',
    component: () => import('../ChangePasswordPage.vue'),
    meta: {
      authType: 'doctor',
      pageTitle: '修改密码'
    }
  }
]
