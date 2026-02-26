import { createId } from "@paralleldrive/cuid2";
import { jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { orderDraft } from "./order-drafts";
import { addresses } from "./addresses";
import { user } from "./users";

export const shippingRateRaw = pgTable("shipping_rate_raw", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),

  orderDraftId: varchar("order_draft_id", { length: 128 })
    .notNull()
    .references(() => orderDraft.id, {
      onDelete: "cascade",
    }),

  addressId: varchar("address_id", { length: 128 })
    .notNull()
    .references(() => addresses.id, {
      onDelete: "cascade",
    }),

  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  request: jsonb("request").notNull(),
  response: jsonb("response").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
