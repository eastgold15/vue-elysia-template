import Elysia from "elysia";
import { db } from "../../libs/connection";
export const dbPlugin = new Elysia({ name: "db" })
  .decorate("db", db)
  .as('global')