import { createId } from "@paralleldrive/cuid2";
import {
  date,
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { product } from "./products";
import { warehouse } from "./warehouses";
import { batch } from "./batches";

export const inventory = pgTable(
  "inventory",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),

    productId: varchar("product_id", { length: 128 })
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),

    warehouseId: varchar("warehouse_id", { length: 128 })
      .notNull()
      .references(() => warehouse.id, { onDelete: "cascade" }),

    batchId: varchar("batch_id", { length: 128 })
      .notNull()
      .references(() => batch.id, { onDelete: "cascade" }),

    expiredAt: date("expired_at").notNull(),

    quantity: integer("quantity").notNull().default(0),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    index("inventory_lookup_idx").on(t.productId, t.warehouseId, t.expiredAt),
  ],
);
