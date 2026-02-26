import { createId } from "@paralleldrive/cuid2";
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { inventory } from "./inventories";
import { stockTypeEnum } from "./enums";

export const stockMovement = pgTable(
  "stock_movement",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),

    inventoryId: varchar("inventory_id", { length: 128 })
      .notNull()
      .references(() => inventory.id, { onDelete: "cascade" }),

    type: stockTypeEnum("type").notNull(),

    quantity: integer("quantity").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("stock_movement_inventory_idx").on(t.inventoryId)],
);
