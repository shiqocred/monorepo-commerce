import { createId } from "@paralleldrive/cuid2";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { orderDraft } from "./order-drafts";
import { addresses } from "./addresses";
import { user } from "./users";
import { shippingRateRaw } from "./shipping-rate-raws";

export const shippingRate = pgTable("shipping_rate", {
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

  shippingRateRawId: varchar("shipping_rate_raw_id", { length: 128 })
    .notNull()
    .references(() => shippingRateRaw.id, {
      onDelete: "cascade",
    }),

  courierCompany: text("courier_company").notNull(),
  courierName: text("courier_name").notNull(),
  courierType: text("courier_type").notNull(),
  serviceName: text("service_name").notNull(),
  durationRange: text("duration_range").notNull(),
  durationUnit: text("duration_unit").notNull(),
  price: integer("price").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
