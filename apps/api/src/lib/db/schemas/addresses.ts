import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { user } from "./users";

export const addresses = pgTable(
  "address",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    name: text("name").notNull(),
    phoneNumber: text("phone_number").notNull(),
    address: text("address").notNull(),
    detail: text("detail").notNull(),
    province: text("province").notNull(), // provinsi
    city: text("city").notNull(), // kabupaten
    district: text("district").notNull(), // kecamatan
    postalCode: text("postal_code").notNull(),
    mapId: text("map_id").notNull(),
    formatted: text("formatted").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),

    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("address_user_id_is_default_idx").on(table.userId, table.isDefault),
    index("address_user_formatted_idx").on(table.userId, table.formatted),
    index("address_is_default_idx").on(table.isDefault),
  ],
);
