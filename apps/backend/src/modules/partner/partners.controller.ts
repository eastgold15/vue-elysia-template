import { dbPlugin } from "@backend/plugins/db";
import { Elysia, t } from "elysia";
import { commonRes } from "../../utils/Res";
import { PartnersModel, partnersTable } from "./partners.model";
/**
 * 合作伙伴控制器
 * 处理合作伙伴相关的HTTP请求
 */
export const partnersController = new Elysia({
	prefix: "/partners",
	tags: ["Partners"],
})
	.use(dbPlugin)
	.post(
		"/",
		async ({ db, body }) => {
			const res = db.insert(partnersTable).values(body);
			return commonRes(res);
		},
		{
			body: PartnersModel.Create,
			detail: {
				summary: "创建合作伙伴",
				description: "创建合作伙伴",
			},
		},
	) // 简单的ping接口
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
