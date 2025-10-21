import path from "node:path";
import { cors } from "@elysiajs/cors";
import { fromTypes, openapi } from "@elysiajs/openapi";
import { Elysia, redirect } from "elysia";
import { partnersController } from "./modules/partner";
import { usersController } from "./modules/user";
import { errorHandler } from "./plugins/err/err.plugin";
import { logPlugin } from "./plugins/logger";
import { dbPlugin } from "./plugins/db";


console.log("启动检查...");
console.log("启动检查完成", path.join(import.meta.dirname, "../tsconfig.json"));

const api = new Elysia({ prefix: "/api" })
  .use(partnersController)
  .use(usersController);

console.log("projectRoot", path.resolve(import.meta.dir, "../"));
console.log("tsconfigPath", path.resolve(import.meta.dir, "../tsconfig.json"));
export const app = new Elysia()
  .use(cors())
  .get("/", redirect("/openapi"), {
    detail: {
      hide: true,
    },
  })
  .use(
    openapi({
      documentation: {
        info: {
          title: "Gina Shopping API",
          version: "1.0.71",
          description: "基于 Elysia + Drizzle + TypeScript 的电商后端 API",
        },
        tags: [{ name: "Products", description: "商品管理" }],
      },
      references: fromTypes(
        process.env.NODE_ENV === "production"
          ? "dist/index.d.ts"
          : "src/server.ts",
        {
          // debug: process.env.NODE_ENV !== "production",
        },
      ),
    }),
  )
  .get("/favicon.ico", () => "ssds")
  .get(
    "/health",
    () => ({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    }),
    {
      detail: {
        summary: "健康检查",
        description: "检查API服务状态",
      },
    },
  )
  .use(errorHandler)
  .use(logPlugin)
  .use(dbPlugin)
  .use(api);
