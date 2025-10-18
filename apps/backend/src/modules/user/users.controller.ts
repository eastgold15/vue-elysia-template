
import Elysia from "elysia";
import { commonRes } from "../../utils/Res";
import { UsersModel } from "./users.model";
import { UsersService } from "./users.service";
/**
 * 用户管理控制器
 * 处理用户相关的HTTP请求
 */
export const usersController = new Elysia({
  prefix: "/users",
  tags: ["用戶管理"],
})
