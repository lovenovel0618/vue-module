import type { RGetInfo, PGetInfo } from "./model";
import request from "@/utils/http";

export const page_one_list = (url: string, data: RGetInfo, config?: any) =>
  request.get<RGetInfo, PGetInfo>(url)(data, config);
