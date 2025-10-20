import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../configs/config";
import * as schema from "./schema";

// You can specify any property from the node-postgres connection options
const db = drizzle({
	connection: {
		connectionString: config.DATABASE_URL || "",
	},
	schema,
});

export { db };
