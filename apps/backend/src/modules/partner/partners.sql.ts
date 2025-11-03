import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

// import {
//   createInsertSchema,
//   createSelectSchema,
//   createUpdateSchema,
// } from "drizzle-zod";

import { createdAt, id, updatedAt } from "../../libs/schemaHelper";

/**
 * 1. Drizzle 表定义
 * 合作伙伴表 - 存储网站的合作伙伴信息
 * 用于展示合作伙伴logo、链接等信息
 */
export const partnersTable = pgTable("partners", {
  id, // 合作伙伴唯一标识
  createdAt,
  updatedAt,
  name: varchar("name", { length: 255 }).notNull(), // 合作伙伴名称
  description: text("description").notNull(), // 合作伙伴描述
  url: varchar("url", { length: 255 }).notNull(), // 合作伙伴官网链接
  sortOrder: integer("sort_order").default(0), // 排序权重
  isActive: boolean("is_active").default(true), // 是否显示
});

// export namespace PartnersModel {
//   // === 基础 TypeBox Schema（基于 Drizzle 表生成） ===
//   export const Insert = createInsertSchema(partnersTable);
//   export const Update = createUpdateSchema(partnersTable);
//   export const Select = createSelectSchema(partnersTable);

//   // === 业务 DTO Schemas ===
//   export const Create = Insert.omit({ id: true, createdAt: true, updatedAt: true });
//   export const Patch = Update.omit({ id: true, createdAt: true, updatedAt: true });
//   export const Query = Select.omit({ id: true, createdAt: true, updatedAt: true });

// }

/**
 * 2. 合作伙伴关系定义
 */
// export const partnersRelations = relations(partnersTable, ({ many }) => ({
//   // 未来可扩展其他关联
// }));
