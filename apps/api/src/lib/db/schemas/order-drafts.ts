import { createId } from "@paralleldrive/cuid2";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./users";
import { discount } from "./discounts";
import { freeShipping } from "./free-shippings";

export const orderDraft = pgTable("order_draft", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),

  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  discountId: varchar("discount_id", { length: 128 }).references(
    () => discount.id,
    { onDelete: "set null" },
  ),

  freeShippingId: varchar("free_shipping_id", { length: 128 }).references(
    () => freeShipping.id,
    { onDelete: "set null" },
  ),

  totalWeight: integer("total_weight").notNull(),
  totalPrice: integer("total_price").notNull(),
  totalDiscount: integer("total_discount"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
