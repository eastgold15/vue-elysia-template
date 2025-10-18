import { config } from "./configs/config";
import { startupHealthCheck } from "./libs/healthyCheck";
import { app } from "./server";
import packageJson from "../package.json";

const signals = ["SIGINT", "SIGTERM"];

for (const signal of signals) {
  process.on(signal, async () => {
    console.log(`Received ${signal}. Initiating graceful shutdown...`);
    await app.stop();
    process.exit(0);
  });
}

process.on("uncaughtException", (error) => {
  console.error(error);
});

process.on("unhandledRejection", (error) => {
  console.error(error);
});

(() => {
  console.log(
    `🦊 Elysia is running at ${process.env.APP_NAME}:: ${app.server?.url.origin}`,
  );
  startupHealthCheck();

  if (import.meta.env.NODE_ENV === "production") {
    console.log("当前环境：生产环境: https://wx.xxx.top");
    console.log("版本号:", packageJson.version);
  } else {
    console.log("当前环境：开发环境");
    console.log("版本号:", packageJson.version);
  }
})();



const elysia = app.listen(config.PORT, () =>
  console.log(`🦊 Server started at ${app.server?.url.origin}`),
);

export type EndApp = typeof elysia;