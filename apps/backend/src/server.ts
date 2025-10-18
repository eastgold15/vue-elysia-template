import path from "node:path";
import { Elysia, redirect } from "elysia";
import { cors } from "@elysiajs/cors";

import { partnersController } from "./modules/partner";
import { usersController } from "./modules/user";

import { fromTypes, openapi } from "@elysiajs/openapi";
import { errorHandler } from "./plugins/err/err.plugin";
import { logPlugin } from "./plugins/logger";

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
        tags: [
          { name: "Products", description: "商品管理" },
        ],
      },
      references: fromTypes(
        process.env.NODE_ENV === "production"
          ? "dist/index.d.ts"
          : "src/index.ts",
        {
          // debug: process.env.NODE_ENV !== "production",
          projectRoot: path.resolve(import.meta.dir, "../"),
          tsconfigPath: path.resolve(import.meta.dir, "../tsconfig.json"),
        },
      ),
    }),
  )
  .get("/favicon.ico", () => "ssds")
  .use(errorHandler)
  .use(logPlugin)
  .use(api)








