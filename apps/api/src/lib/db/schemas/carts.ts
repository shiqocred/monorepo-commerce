import {
  boolean,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { user } from "./users";
import { product } from "./products";

export const carts = pgTable(
  "cart",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // unique cart per user
    productId: varchar("product_id", { length: 128 })
      .notNull()
      .references(() => product.id),
    quantity: integer("quantity").notNull().default(1),
    checked: boolean("checked").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("cart_user_product_uidx").on(table.userId, table.productId),
    index("cart_user_idx").on(table.userId),
  ],
);
