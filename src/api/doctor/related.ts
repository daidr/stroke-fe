import { ApiGet, ApiPost } from '@/utils/req'

export interface IDoctorDiagnosisItem {
  id: number
  doctor_id: number
  patient_id: number
  diagnosis_date: string
  stroke_type: number
  stroke_level: number
}

export type IDoctorDiagnosisList = IDoctorDiagnosisItem[]

export const getDoctorDiagnosisList = async () => {
  return await ApiGet(`/doctor/diagnosis`)
    .then((res) => {
      return res.data as IDoctorDiagnosisList
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}

export interface IDoctorPatientItem {
  name: string
  sex: number
  age: number
  diagnosis: IDoctorDiagnosisList
}

export const getDoctorPatientById = async (id: number) => {
  return await ApiGet(`/doctor/patient/${id}`)
    .then((res) => {
      return res.data as IDoctorPatientItem
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}

export interface IDoctorDiagnosisRecordItem {
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

export interface IDoctorDiagnosisPlanItem {
  id: number
  name: string
  diagnosis_id: string
  effection: number
}

export interface IDoctorDiagnosisDetailsItem {
  records: IDoctorDiagnosisRecordItem[]
  plans: IDoctorDiagnosisPlanItem[]
}

export const getDoctorDiagnosisDetailsById = async (id: number) => {
  return await ApiGet(`/doctor/diagnosis/${id}`)
    .then((res) => {
      return res.data as IDoctorDiagnosisDetailsItem
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}

export interface IDoctorPlanTreatmentsItem {
  id: number
  plan_id: number
  treatment_date: string
  ischemic_area_v: number
  vessel_density_p: number
}

export const getDoctorPlanTreatmentsById = async (id: number) => {
  return await ApiGet(`/doctor/plan/${id}`)
    .then((res) => {
      return res.data.treatments as IDoctorPlanTreatmentsItem[]
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}
