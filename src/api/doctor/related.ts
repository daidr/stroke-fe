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
  return await ApiGet(`/api/doctor/diagnosis`)
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
  return await ApiGet(`/api/doctor/patient/${id}`)
    .then((res) => {
      return res.data as IDoctorPatientItem
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}
