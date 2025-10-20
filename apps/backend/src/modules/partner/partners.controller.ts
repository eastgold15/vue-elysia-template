import { Elysia, t } from "elysia";

import { commonRes } from "../../utils/Res";
/**
 * 合作伙伴控制器
 * 处理合作伙伴相关的HTTP请求
 */
export const partnersController = new Elysia({
	prefix: "/partners",
	tags: ["Partners"],
})
	// 简单的ping接口
	.get(
		"/ping",
		({ query: { str } }) => {
			return commonRes(str, 200);
		},
		{
			query: t.Object({
				str: t.String(),
			}),
			detail: {
				summary: "健康检查",
				description: "检查用户服务是否正常运行",
			},
		},
	);
