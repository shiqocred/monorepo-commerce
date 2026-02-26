import { createId } from "@paralleldrive/cuid2";
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { orderDraft } from "./order-drafts";
import { product } from "./products";

export const orderDraftItem = pgTable(
  "order_draft_item",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),

    orderDraftId: varchar("order_draft_id", { length: 128 })
      .notNull()
      .references(() => orderDraft.id, {
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

    discountPrice: integer("discount_price").default(0).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("idx_order_draft_items_order_id").on(table.orderDraftId)],
);
