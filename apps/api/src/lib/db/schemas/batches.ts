import { createId } from "@paralleldrive/cuid2";
import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { product } from "./products";

export const batch = pgTable(
  "batch",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),

    productId: varchar("product_id", { length: 128 })
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),

    batchNumber: varchar("batch_number", { length: 64 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [index("batch_product_idx").on(t.productId)],
);
