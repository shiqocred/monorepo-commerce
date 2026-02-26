import { createId } from "@paralleldrive/cuid2";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { inventory } from "./inventories";

export const stockTransfer = pgTable("stock_transfer", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),

  fromWarehouseId: varchar("from_warehouse_id", { length: 128 })
    .notNull()
    .references(() => inventory.id, { onDelete: "cascade" }),

  toWarehouseId: varchar("to_warehouse_id", { length: 128 })
    .notNull()
    .references(() => inventory.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
