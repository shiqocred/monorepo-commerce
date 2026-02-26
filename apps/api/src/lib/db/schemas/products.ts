import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { category } from "./categories";
import { supplier } from "./suppliers";

export const product = pgTable(
  "product",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    slug: text("slug").unique().notNull(),
    description: text("description"),
    indication: text("indication"),
    dosageUsage: text("dosage_usage"),
    storageInstruction: text("storage_instruction"),

    unitValue: integer("unit_value").notNull(),
    unitMeasure: text("unit_measure").notNull(),
    packagingType: text("packaging_type").notNull(),

    sku: text("sku").unique().notNull(),
    barcode: text("barcode").unique().notNull(),
    stock: integer("stock").notNull().default(0),
    weight: integer("weight").notNull().default(0),
    price: integer("price").notNull().default(0),

    status: boolean("status").default(false),
    categoryId: text("category_id")
      .references(() => category.id)
      .notNull(),
    supplierId: text("supplier_id")
      .references(() => supplier.id, {
        onDelete: "set null",
      })
      .notNull(),
    deletedAt: timestamp("deleted_at", { mode: "date" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
  },
  (table) => [uniqueIndex("products_slug_idx").on(table.slug)],
);
