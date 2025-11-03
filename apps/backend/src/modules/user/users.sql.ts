import { relations } from "drizzle-orm";
import {
  index,
  integer,
  boolean as pgBoolean,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../../libs/schemaHelper";

/**
 * 1. Drizzle 表定义
 * 用户表 - 存储用户基本信息
 */
export const usersTable = pgTable(
  "users",
  {
    id,
    createdAt,
    updatedAt,
    username: varchar("username", { length: 50 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(), // 存储加密后的密码
    email: varchar("email", { length: 100 }).unique().notNull(), // @typebox { format: 'email' }
    role: varchar("role", { length: 50 }).notNull().default("user"),
    nickname: varchar("nickname", { length: 50 }).notNull(),
    avatar: varchar("avatar", { length: 255 }),
    isActive: pgBoolean("isActive").notNull().default(true), // true: 正常, false: 禁用
  },
  (users) => [index("user_id_idx").on(users.id)]
);

/**
 * Token 表定义
 */
export const tokenTable = pgTable(
  "tokens",
  {
    id,
    ownerId: integer("owner_id")
      .notNull()
      .references(() => usersTable.id),
    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token").notNull(),
    createdAt,
  },
  (token) => [index("token_id_idx").on(token.id)]
);

/**
 * 关系定义
 */
export const tokenRelations = relations(tokenTable, ({ one }) => ({
  owner: one(usersTable, {
    fields: [tokenTable.ownerId],
    references: [usersTable.id],
  }),
}));
