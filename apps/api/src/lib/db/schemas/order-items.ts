import { createId } from "@paralleldrive/cuid2";
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { order } from "./orders";
import { product } from "./products";

export const orderItem = pgTable(
  "order_item",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),

    orderId: varchar("order_id", { length: 128 })
      .notNull()
      .references(() => order.id, {
        onDelete: "cascade",
      }),

    productId: varchar("product_id", { length: 128 })
      .notNull()
      .references(() => product.id, {
        onDelete: "set null",
      }),

    price: integer("price").notNull(),

    weight: integer("weight").notNull(),
    quantity: integer("quantity").notNull(),

    discount: integer("discount").default(0).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("idx_order_items_order_id").on(table.orderId)],
);
