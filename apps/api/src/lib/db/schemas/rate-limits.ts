import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, bigint, integer, varchar } from "drizzle-orm/pg-core";

export const rateLimit = pgTable("rate_limit", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  key: text("key"),
  count: integer("count"),
  lastRequest: bigint("last_request", { mode: "number" }),
});
