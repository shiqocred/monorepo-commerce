import { boolean, index, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const courier = pgTable(
  "courier",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    value: text("value").notNull(),
    isActive: boolean("is_active").notNull().default(false),
  },
  (table) => [index("idx_courier_is_active").on(table.isActive)],
);
