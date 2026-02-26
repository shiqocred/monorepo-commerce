import { createId } from "@paralleldrive/cuid2";
import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const category = pgTable(
  "category",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    slug: text("slug").unique().notNull(),
    image: text("image"),

    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("category_name_idx").on(table.name)],
);
