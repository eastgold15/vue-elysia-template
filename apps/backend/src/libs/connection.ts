import { drizzle } from "drizzle-orm/node-postgres";
import { envConfig } from "../configs/config";
import * as schema from "./schema";

// You can specify any property from the node-postgres connection options
const db = drizzle({
  connection: {
    connectionString: envConfig.DATABASE_URL || "",
  },
  schema,
});

export { db };
