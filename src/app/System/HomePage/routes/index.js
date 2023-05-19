export const routes = [
  {
    path: '/',
    component: () => import('../HomePage.vue'),
    meta: {
      pageTitle: '诊断列表',
      hideHeader: false,
      authType: 'system'
    },
    children: [
      {
        path: '',
        component: () => import('../views/DefaultView.vue')
      },
      {
        path: 'diagnose',
        component: () => import('../views/DiagnoseView.vue')
      },
      {
        path: 'doctor',
        component: () => import('../views/DoctorView.vue')
      },
      {
        path: 'patient',
        component: () => import('../views/PatientView.vue')
      },
      {
        path: 'plan',
        component: () => import('../views/PlanView.vue')
      },
      {
        path: 'report',
        component: () => import('../views/ReportView.vue')
      },
      {
        path: 'treatment',
        component: () => import('../views/TreatmentView.vue')
      }
    ]
  }
]
