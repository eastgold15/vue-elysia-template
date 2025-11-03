import { PageQuerySchema } from "@backend/libs/common-schemas";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-typebox";
import { t } from "elysia";
import { usersTable } from "./users.sql";

// 基础 TypeBox Schema（基于 Drizzle 表生成）
const Insert = createInsertSchema(usersTable, {});
const Update = createUpdateSchema(usersTable);
const Select = createSelectSchema(usersTable);

// 业务 DTO Schemas
const Create = t.Omit(Insert, ["id", "createdAt", "updatedAt"]);
const Patch = t.Omit(Update, ["id", "createdAt", "updatedAt", "password"]);

// 查询 Schemas
const ListQuery = t.Composite([
  PageQuerySchema,
  t.Object({
    username: t.String({ optional: true }),
    email: t.String({ optional: true }),
    isActive: t.Boolean({ optional: true }),
  }),
]);

// 操作 Schemas
const Login = t.Object({
  username: t.String({ minLength: 1 }),
  password: t.String({ minLength: 1 }),
});

const ChangePassword = t.Object({
  oldPassword: t.String({ minLength: 1 }),
  newPassword: t.String({ minLength: 6 }),
});

// 前端展示类型（VO - View Object）
const ViewObject = t.Object({
  id: t.Integer(),
  username: t.String(),
  email: t.String(),
  role: t.String(),
  nickname: t.String(),
  avatar: t.String({ optional: true }),
  isActive: t.Boolean(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

// 用户状态枚举
type UserStatus = "active" | "disabled" | "pending" | "suspended";

/**
 * 用户模型命名空间
 * 包含所有用户相关的 Schema、类型定义和业务逻辑
 */
export const UsersModel = {
  Insert,
  Update,
  Select,
  Create,
  Patch,
  ListQuery,
  Login,
  ChangePassword,
  ViewObject,
};

export type UsersModel = {
  UserStatus: UserStatus;
};
