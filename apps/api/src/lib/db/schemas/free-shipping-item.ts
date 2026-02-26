import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { freeShipping } from "./free-shippings";
import { category } from "./categories";
import { supplier } from "./suppliers";
import { pet } from "./pets"; // pastikan pets sudah dibuat
import { user } from "./users";
import { userRoleEnum } from "./enums";
import { product } from "./products";

export const freeShippingProduct = pgTable(
  "free_shipping_product",
  {
    freeShippingId: varchar("free_shipping_id", { length: 128 })
      .notNull()
      .references(() => freeShipping.id, {
        onDelete: "cascade",
      }),
    productId: varchar("product_id", { length: 128 })
      .notNull()
      .references(() => product.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [
    uniqueIndex("free_shipping_product_uidx").on(t.freeShippingId, t.productId),
  ],
);

export const freeShippingCategory = pgTable(
  "free_shipping_category",
  {
    freeShippingId: varchar("free_shipping_id", { length: 128 })
      .notNull()
      .references(() => freeShipping.id, {
        onDelete: "cascade",
      }),
    categoryId: varchar("category_id", { length: 128 })
      .notNull()
      .references(() => category.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [
    uniqueIndex("free_shipping_category_uidx").on(
      t.freeShippingId,
      t.categoryId,
    ),
  ],
);

export const freeShippingupplier = pgTable(
  "free_shipping_supplier",
  {
    freeShippingId: varchar("free_shipping_id", { length: 128 })
      .notNull()
      .references(() => freeShipping.id, {
        onDelete: "cascade",
      }),
    supplierId: varchar("supplier_id", { length: 128 })
      .notNull()
      .references(() => supplier.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [
    uniqueIndex("free_shipping_supplier_uidx").on(
      t.freeShippingId,
      t.supplierId,
    ),
  ],
);

export const freeShippingPet = pgTable(
  "free_shipping_pet",
  {
    freeShippingId: varchar("free_shipping_id", { length: 128 })
      .notNull()
      .references(() => freeShipping.id, {
        onDelete: "cascade",
      }),
    petId: varchar("pet_id", { length: 128 })
      .notNull()
      .references(() => pet.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("free_shipping_pet_uidx").on(t.freeShippingId, t.petId)],
);

export const freeShippingRole = pgTable(
  "free_shipping_role",
  {
    freeShippingId: varchar("free_shipping_id", { length: 128 })
      .notNull()
      .references(() => freeShipping.id, { onDelete: "cascade" }),
    role: userRoleEnum("role").notNull(),
  },
  (t) => [uniqueIndex("free_shipping_role_uidx").on(t.freeShippingId, t.role)],
);

export const freeShippingUser = pgTable(
  "free_shipping_user",
  {
    freeShippingId: varchar("free_shipping_id", { length: 128 })
      .notNull()
      .references(() => freeShipping.id, {
        onDelete: "cascade",
      }),
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // cocokkan dengan sistem user kamu
  },
  (t) => [
    uniqueIndex("free_shipping_user_uidx").on(t.freeShippingId, t.userId),
  ],
);
