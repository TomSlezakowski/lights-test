export const random = (num) => {
  return Array.isArray(num)
    ? Math.random() * (num[1] - num[0]) + num[0]
    : Math.random() * num
}

export const randomFromArray = (arr) => {
  if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)]
}
