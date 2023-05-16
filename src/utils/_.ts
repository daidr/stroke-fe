export const getGenderString = (genderIdentifier: number) => {
  switch (genderIdentifier) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return '其他'
  }
}
