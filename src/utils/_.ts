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

export const getStrokeTypeString = (strokeType: number) => {
  switch (strokeType) {
    case 1:
      return '出血性脑卒中'
    case 2:
      return '缺血性脑卒中'
    default:
      return '其他'
  }
}

export const getStrokeLevelString = (strokeLevel: number) => {
  switch (strokeLevel) {
    case 1:
      return '轻微'
    case 2:
      return '中度'
    case 3:
      return '严重'
    default:
      return '未知'
  }
}

export const getStrokeLevelColor = (strokeLevel: number) => {
  switch (strokeLevel) {
    case 1:
      return 'bg-yellow-500'
    case 2:
      return 'bg-orange-500'
    case 3:
      return 'bg-red-700'
    default:
      return 'bg-gray-400'
  }
}

export const getPlanEffectionText = (effectionLevel: number) => {
  if(effectionLevel <=20) {
    return '轻微'
  } else if(effectionLevel <= 70) {
    return '一般'
  } else if(effectionLevel <= 100) {
    return '良好'
  } else {
    return '未知'
  }
}