// 登录接口需要携带参数的ts类型

export interface loginForm {
  username: string
  password: string
}

// 定义全部接口数据返回拥有的 ts 类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 定义登录接口返回的数据额类型
export interface loginResData extends ResponseData {
  data: string
}
// 获取用户信息返回数据类型
export interface userinfoResData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
