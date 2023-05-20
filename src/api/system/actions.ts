import {
  SystemApiGet as ApiGet,
  SystemApiPost as ApiPost,
  SystemApiPut as ApiPut,
  SystemApiDelete as ApiDelete
} from '@/utils/req'

// Diagnose
export interface ISystemDiagnoseItem {
  id: number
  doctor_id: number
  patient_id: number
  diagnosis_date: string
  stroke_type: number
  stroke_level: number
}

export const Diagnose = {
  list: async () => {
    return await ApiGet(`/system/diagnosis`)
      .then((res) => {
        return res.data as ISystemDiagnoseItem[]
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  get: async (id: number) => {
    return await ApiGet(`/system/diagnosis/${id}`)
      .then((res) => {
        return res.data as ISystemDiagnoseItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  create: async (data: ISystemDiagnoseItem) => {
    return await ApiPost(`/system/diagnosis`, data)
      .then((res) => {
        return res.data as ISystemDiagnoseItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  update: async (id: number, data: ISystemDiagnoseItem) => {
    return await ApiPut(`/system/diagnosis/${id}`, data)
      .then((res) => {
        return res.data as ISystemDiagnoseItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  delete: async (id: number) => {
    return await ApiDelete(`/system/diagnosis/${id}`)
      .then((res) => {
        return res.data as ISystemDiagnoseItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  }
}

// Doctor
export interface ISystemDoctorItem {
  id: number
  name: string
  username: string
  password: string
  active: boolean
}

export const Doctor = {
  list: async () => {
    return await ApiGet(`/system/doctors`)
      .then((res) => {
        return res.data as ISystemDoctorItem[]
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  get: async (id: number) => {
    return await ApiGet(`/system/doctors/${id}`)
      .then((res) => {
        return res.data as ISystemDoctorItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  create: async (data: ISystemDoctorItem) => {
    return await ApiPost(`/system/doctors`, data)
      .then((res) => {
        return res.data as ISystemDoctorItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  update: async (id: number, data: ISystemDoctorItem) => {
    return await ApiPut(`/system/doctors/${id}`, data)
      .then((res) => {
        return res.data as ISystemDoctorItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  delete: async (id: number) => {
    return await ApiDelete(`/system/doctors/${id}`)
      .then((res) => {
        return res.data as ISystemDoctorItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  }
}

// Patient
export interface ISystemPatientItem {
  id: number
  name: string
  sex: number
  age: number
}

export const Patient = {
  list: async () => {
    return await ApiGet(`/system/patients`)
      .then((res) => {
        return res.data as ISystemPatientItem[]
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  get: async (id: number) => {
    return await ApiGet(`/system/patients/${id}`)
      .then((res) => {
        return res.data as ISystemPatientItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  create: async (data: ISystemPatientItem) => {
    return await ApiPost(`/system/patients`, data)
      .then((res) => {
        return res.data as ISystemPatientItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  update: async (id: number, data: ISystemPatientItem) => {
    return await ApiPut(`/system/patients/${id}`, data)
      .then((res) => {
        return res.data as ISystemPatientItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  delete: async (id: number) => {
    return await ApiDelete(`/system/patients/${id}`)
      .then((res) => {
        return res.data as ISystemPatientItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  }
}

// Record
export interface ISystemRecordItem {
  id: number
  diagnosis_id: number
  record_date: string
  image_source: string
  main_vessel_ratio_x: number
  general_vessel_ratio_y: number
  tiny_vessel_ratio_z: number
  ischemic_area_v: number
  vessel_density_p: number
}

export const Record = {
  list: async () => {
    return await ApiGet(`/system/records`)
      .then((res) => {
        return res.data as ISystemRecordItem[]
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  get: async (id: number) => {
    return await ApiGet(`/system/records/${id}`)
      .then((res) => {
        return res.data as ISystemRecordItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  create: async (data: ISystemRecordItem) => {
    return await ApiPost(`/system/records`, data)
      .then((res) => {
        return res.data as ISystemRecordItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  update: async (id: number, data: ISystemRecordItem) => {
    return await ApiPut(`/system/records/${id}`, data)
      .then((res) => {
        return res.data as ISystemRecordItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  delete: async (id: number) => {
    return await ApiDelete(`/system/records/${id}`)
      .then((res) => {
        return res.data as ISystemRecordItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  }
}

// Plan
export interface ISystemPlanItem {
  id: number
  diagnosis_id: number
  name: string
  effection: number
}

export const Plan = {
  list: async () => {
    return await ApiGet(`/system/plans`)
      .then((res) => {
        return res.data as ISystemPlanItem[]
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  get: async (id: number) => {
    return await ApiGet(`/system/plans/${id}`)
      .then((res) => {
        return res.data as ISystemPlanItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  create: async (data: ISystemPlanItem) => {
    return await ApiPost(`/system/plans`, data)
      .then((res) => {
        return res.data as ISystemPlanItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  update: async (id: number, data: ISystemPlanItem) => {
    return await ApiPut(`/system/plans/${id}`, data)
      .then((res) => {
        return res.data as ISystemPlanItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  delete: async (id: number) => {
    return await ApiDelete(`/system/plans/${id}`)
      .then((res) => {
        return res.data as ISystemPlanItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  }
}

// Treatment
export interface ISystemTreatmentItem {
  id: number
  plan_id: number
  treatment_date: string
  ischemic_area_v: number
  vessel_density_p: number
}

export const Treatment = {
  list: async () => {
    return await ApiGet(`/system/treatments`)
      .then((res) => {
        return res.data as ISystemTreatmentItem[]
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  get: async (id: number) => {
    return await ApiGet(`/system/treatments/${id}`)
      .then((res) => {
        return res.data as ISystemTreatmentItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  create: async (data: ISystemTreatmentItem) => {
    return await ApiPost(`/system/treatments`, data)
      .then((res) => {
        return res.data as ISystemTreatmentItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  update: async (id: number, data: ISystemTreatmentItem) => {
    return await ApiPut(`/system/treatments/${id}`, data)
      .then((res) => {
        return res.data as ISystemPlanItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  },
  delete: async (id: number) => {
    return await ApiDelete(`/system/treatments/${id}`)
      .then((res) => {
        return res.data as ISystemTreatmentItem
      })
      .catch((err) => {
        console.log(err)
        return false as false
      })
  }
}
