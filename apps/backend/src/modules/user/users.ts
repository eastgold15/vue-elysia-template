import Elysia from "elysia";
import { commonRes } from "../../utils/Res";

/**
 * 用户管理控制器
 * 处理用户相关的HTTP请求
 */
export const usersRoute = new Elysia({
  prefix: "/users",
  tags: ["用戶管理"],
})
  // 简单的ping接口
  .get("/ping", () => commonRes("pong"), {
    detail: {
      summary: "健康检查",
      description: "检查用户服务是否正常运行",
    },
  });
