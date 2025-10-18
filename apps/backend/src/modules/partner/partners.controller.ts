
import { Elysia } from "elysia";

import { PartnersService } from "./partners.service";
import { commonRes } from "../../utils/Res";
/**
 * 合作伙伴控制器
 * 处理合作伙伴相关的HTTP请求
 */
export const partnersController = new Elysia({
  prefix: "/partners",
  tags: ["Partners"],
})
