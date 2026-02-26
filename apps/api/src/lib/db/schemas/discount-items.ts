import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { discount } from "./discounts";
import { category } from "./categories";
import { supplier } from "./suppliers";
import { pet } from "./pets"; // pastikan pets sudah dibuat
import { user } from "./users";
import { userRoleEnum } from "./enums";
import { product } from "./products";

export const discountProduct = pgTable(
  "discount_product",
  {
    discountId: varchar("discount_id", { length: 128 })
      .notNull()
      .references(() => discount.id, {
        onDelete: "cascade",
      }),
    productId: varchar("product_id", { length: 128 })
      .notNull()
      .references(() => product.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [uniqueIndex("discount_product_uidx").on(t.discountId, t.productId)],
);

export const discountCategory = pgTable(
  "discount_category",
  {
    discountId: varchar("discount_id", { length: 128 })
      .notNull()
      .references(() => discount.id, {
        onDelete: "cascade",
      }),
    categoryId: varchar("category_id", { length: 128 })
      .notNull()
      .references(() => category.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [uniqueIndex("discount_category_uidx").on(t.discountId, t.categoryId)],
);

export const discountSupplier = pgTable(
  "discount_supplier",
  {
    discountId: varchar("discount_id", { length: 128 })
      .notNull()
      .references(() => discount.id, {
        onDelete: "cascade",
      }),
    supplierId: varchar("supplier_id", { length: 128 })
      .notNull()
      .references(() => supplier.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [uniqueIndex("discount_supplier_uidx").on(t.discountId, t.supplierId)],
);

export const discountPet = pgTable(
  "discount_pet",
  {
    discountId: varchar("discount_id", { length: 128 })
      .notNull()
      .references(() => discount.id, {
        onDelete: "cascade",
      }),
    petId: varchar("pet_id", { length: 128 })
      .notNull()
      .references(() => pet.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("discount_pet_uidx").on(t.discountId, t.petId)],
);

export const discountRole = pgTable(
  "discount_role",
  {
    discountId: varchar("discount_id", { length: 128 })
      .notNull()
      .references(() => discount.id, { onDelete: "cascade" }),
    role: userRoleEnum("role").notNull(),
  },
  (t) => [uniqueIndex("discount_role_uidx").on(t.discountId, t.role)],
);

export const discountUser = pgTable(
  "discount_user",
  {
    discountId: varchar("discount_id", { length: 128 })
      .notNull()
      .references(() => discount.id, {
        onDelete: "cascade",
      }),
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // cocokkan dengan sistem user kamu
  },
  (t) => [uniqueIndex("discount_user_uidx").on(t.discountId, t.userId)],
);
