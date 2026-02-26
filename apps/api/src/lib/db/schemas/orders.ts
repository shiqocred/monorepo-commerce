import { createId } from "@paralleldrive/cuid2";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./users";
import { orderStatusEnum } from "./enums";
import { discount } from "./discounts";
import { freeShipping } from "./free-shippings";

export const order = pgTable("order", {
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

  status: orderStatusEnum("status").notNull().default("WAITING_PAYMENT"),

  productPrice: integer("product_price").notNull(),
  shippingPrice: integer("shipping_price").notNull(),
  totalDiscount: integer("total_discount"),
  totalPrice: integer("total_price").notNull(),
  note: text("note"),

  willExpired: timestamp("will_expired"),
  shippingAt: timestamp("shipping_at"),
  cancelledAt: timestamp("cancelled_at"),
  expiredAt: timestamp("expired_at"),
  paidAt: timestamp("paid_at"),
  deliveredAt: timestamp("delivered_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
