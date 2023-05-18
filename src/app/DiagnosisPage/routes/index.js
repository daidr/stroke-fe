export const routes = [
  {
    path: '/diagnosis/:pid/:id',
    name: 'diagnosis',
    component: () => import('../DiagnosisPage.vue'),
    meta: {
      pageTitle: '诊断详情',
      hideHeader: false,
      authType: 'doctor'
    }
  }
]
