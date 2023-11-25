// 封装本地存储数据和读取数据的方法

export const setToken = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
export const getToken = () => {
  return localStorage.getItem('TOKEN')
}
export const removeToken = () => {
  return localStorage.removeItem('TOKEN')
}
