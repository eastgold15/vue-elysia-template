import type { Config } from "drizzle-kit";

import { envConfig } from "./src/configs/config";

export default {
  schema: "./src/**/*.sql.ts",
  out: "./drizzle",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: envConfig.DATABASE_URL,
  },
} satisfies Config;
