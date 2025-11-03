import { PageQuerySchema } from "@backend/libs/common-schemas";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-typebox";
import { t } from "elysia";
import { partnersTable } from "./partners.sql";

// === 基础 TypeBox Schema（基于 Drizzle 表生成） ===
const Insert = createInsertSchema(partnersTable);
const Update = createUpdateSchema(partnersTable);
const Select = createSelectSchema(partnersTable);

// === 业务 DTO Schemas ===
const Create = t.Omit(Insert, ["id", "createdAt", "updatedAt"]);
const Patch = t.Omit(Update, ["id", "createdAt", "updatedAt"]);

// === 查询 Schemas ===
const ListQuery = t.Composite([
  PageQuerySchema,
  t.Object({
    isActive: t.Boolean({ optional: true }),
    name: t.String({ optional: true }),
  }),
]);

// === 操作 Schemas ===
const StatusUpdate = t.Object({
  isActive: t.Boolean({ optional: true }),
});

// === 前端展示类型（VO - View Object） ===
const ViewObject = t.Object({
  id: t.Integer(),
  name: t.String(),
  description: t.String(),
  url: t.String(),
  sortOrder: t.Integer(),
  isActive: t.Boolean(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

/**
 * 3. 合作伙伴模型 Namespace
 * 使用 namespace 组织所有相关的 TypeBox schemas 和类型定义
 */
export const PartnersModel = {
  Insert,
  Update,
  Select,
  Create,
  Patch,
  ListQuery,
  StatusUpdate,
  ViewObject,
};

export type PartnersModel = {};
