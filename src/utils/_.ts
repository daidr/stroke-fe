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

export const date2String = (date: string) => {
  const _date = new Date(date)
  return `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
}

export const stringEllipsis = (str: string, length: number) => {
  // 长于 20个字符，在中间截断，用...代替
  if (str.length > length) {
    return str.slice(0, length / 2) + '...' + str.slice(-length / 2)
  }
}