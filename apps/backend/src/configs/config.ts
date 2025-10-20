import env from "env-var";

export const config = {
	NODE_ENV: env
		.get("NODE_ENV")
		.default("development")
		.asEnum(["production", "test", "development"]),
	PORT: env.get("PORT").default(3000).asPortNumber(),
	API_URL: env.get("API_URL").default(`http://localhost:3000`).asString(),
	DATABASE_URL: env.get("DATABASE_URL").required().asString(),
	REDIS_URL: env.get("REDIS_URL").default("redis://localhost:6379").asString(),
	PUBLIC_DOMAIN: env.get("PUBLIC_DOMAIN").default("localhost").asString(),
};
