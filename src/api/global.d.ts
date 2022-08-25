// 接口返回 形狀
export interface CommonRes<T = any> {
  code: number;
  message: string;
  result: T;
}
