// 登录接口需要携带参数的ts类型

export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token?: string
  message?: string
}

export interface loginResData {
  code: number
  data: dataType
}

// 定义服务器返回用户信息的类型

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: strng[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

export interface userResData {
  code: number
  data: user
}
