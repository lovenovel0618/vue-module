// export interface RGetInfo {
//   limit: number;
//   page: number;
// }

export interface RGetInfo {
  // limit: number;
  // page: number;
}

export interface PGetInfo {
  keyword: string;
}

export interface ResResult {
  id: number;
  url: string;
  ip: string;
  protocol: string;
  host: number;
  domain: string;
  email: string;
}
