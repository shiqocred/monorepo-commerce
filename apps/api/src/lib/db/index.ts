import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { schema } from "./schemas";
import { databaseUrl } from "@/config";

const pool = new Pool({
  connectionString: databaseUrl,
});

export const db = drizzle({ client: pool, schema });

export * from "./schemas";
