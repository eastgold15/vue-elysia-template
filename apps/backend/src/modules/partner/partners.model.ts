import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-typebox";
import { t } from "elysia";
import { PageQuerySchema } from "../../libs/common-schemas";
import { createdAt, id, updatedAt } from "../../libs/schemaHelper";

/**
 * 1. Drizzle 表定义
 * 合作伙伴表 - 存储网站的合作伙伴信息
 * 用于展示合作伙伴logo、链接等信息
 */
export const partnersTable = pgTable("partners", {
	id, // 合作伙伴唯一标识
	name: varchar("name", { length: 255 }).notNull(), // 合作伙伴名称
	description: text("description").notNull(), // 合作伙伴描述
	url: varchar("url", { length: 255 }).notNull(), // 合作伙伴官网链接
	sortOrder: integer("sort_order").default(0), // 排序权重
	isActive: boolean("is_active").default(true), // 是否显示
	createdAt,
	updatedAt,
});

/**
 * 2. 合作伙伴关系定义
 */
export const partnersRelations = relations(partnersTable, ({ many }) => ({
	// 未来可扩展其他关联
}));

/**
 * 3. 合作伙伴模型 Namespace
 * 使用 namespace 组织所有相关的 TypeBox schemas 和类型定义
 */
export namespace PartnersModel {
	// === 基础 TypeBox Schema（基于 Drizzle 表生成） ===
	export const Insert = createInsertSchema(partnersTable);
	export const Update = createUpdateSchema(partnersTable);
	export const Select = createSelectSchema(partnersTable);

	// === 业务 DTO Schemas ===
	export const Create = t.Omit(Insert, ["id", "createdAt", "updatedAt"]);
	export const Patch = t.Omit(Update, ["id", "createdAt", "updatedAt"]);

	// === 查询 Schemas ===
	export const ListQuery = t.Composite([
		PageQuerySchema,
		t.Object({
			isActive: t.Boolean({ optional: true }),
			name: t.String({ optional: true }),
		}),
	]);

	// === 操作 Schemas ===
	export const StatusUpdate = t.Object({
		isActive: t.Boolean({ optional: true }),
	});

	// === 前端展示类型（VO - View Object） ===
	export const ViewObject = t.Object({
		id: t.Integer(),
		name: t.String(),
		description: t.String(),
		url: t.String(),
		sortOrder: t.Integer(),
		isActive: t.Boolean(),
		createdAt: t.Date(),
		updatedAt: t.Date(),
	});
}
