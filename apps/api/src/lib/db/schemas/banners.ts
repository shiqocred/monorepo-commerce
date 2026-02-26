import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { bannerEnum } from "./enums";

export const banner = pgTable(
  "banner",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    image: text("image").notNull(),
    type: bannerEnum("type").notNull(),
    startAt: timestamp("start_at").notNull(),
    endAt: timestamp("end_at"),
    sortOrder: integer("sort_order").notNull().default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("banner_sort_idx").on(table.sortOrder)],
);
