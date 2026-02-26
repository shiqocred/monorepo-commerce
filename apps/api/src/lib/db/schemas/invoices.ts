import { createId } from "@paralleldrive/cuid2";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { order } from "./orders";
import { paymentStatusEnum } from "./enums";

export const invoices = pgTable(
  "invoice",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),

    orderId: varchar("order_id", { length: 128 })
      .notNull()
      .references(() => order.id, { onDelete: "cascade" }),

    paymentId: text("payment_id"),
    paymentChannel: text("payment_channel"),
    paymentMethod: text("payment_method"),
    amount: integer("amount").notNull(),
    status: paymentStatusEnum("status").notNull().default("PENDING"),

    expiredAt: timestamp("expired_at"),
    paidAt: timestamp("paid_at"),
    cancelledAt: timestamp("cancelled_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [uniqueIndex("invoice_order_uidx").on(table.orderId)],
);
