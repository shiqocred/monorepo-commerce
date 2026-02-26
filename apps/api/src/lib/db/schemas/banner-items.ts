import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { banner } from "./banners";
import { product } from "./products";
import { pet } from "./pets";
import { supplier } from "./suppliers";
import { promo } from "./promos";
import { category } from "./categories";

export const bannerProduct = pgTable(
  "banner_item_product",
  {
    bannerId: varchar("banner_id", { length: 128 })
      .notNull()
      .references(() => banner.id, {
        onDelete: "cascade",
      }),
    productId: varchar("product_id", { length: 128 })
      .notNull()
      .references(() => product.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [uniqueIndex("banner_item_product_uidx").on(t.bannerId, t.productId)],
);

export const bannerCategory = pgTable(
  "banner_item_category",
  {
    bannerId: varchar("banner_id", { length: 128 })
      .notNull()
      .references(() => banner.id, {
        onDelete: "cascade",
      }),
    categoryId: varchar("category_id", { length: 128 })
      .notNull()
      .references(() => category.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [
    uniqueIndex("banner_item_category_uidx").on(t.bannerId, t.categoryId),
  ],
);

export const bannerSupplier = pgTable(
  "banner_item_supplier",
  {
    bannerId: varchar("banner_id", { length: 128 })
      .notNull()
      .references(() => banner.id, {
        onDelete: "cascade",
      }),
    supplierId: varchar("supplier_id", { length: 128 })
      .notNull()
      .references(() => supplier.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [
    uniqueIndex("banner_item_supplier_uidx").on(t.bannerId, t.supplierId),
  ],
);

export const bannerPet = pgTable(
  "banner_item_pet",
  {
    bannerId: varchar("banner_id", { length: 128 })
      .notNull()
      .references(() => banner.id, {
        onDelete: "cascade",
      }),
    petId: varchar("pet_id", { length: 128 })
      .notNull()
      .references(() => pet.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("banner_item_pet_uidx").on(t.bannerId, t.petId)],
);

export const bannerPromo = pgTable(
  "banner_item_promo",
  {
    bannerId: varchar("banner_id", { length: 128 })
      .notNull()
      .references(() => banner.id, {
        onDelete: "cascade",
      }),
    promoId: varchar("promo_id", { length: 128 })
      .notNull()
      .references(() => promo.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("banner_item_promo_uidx").on(t.bannerId, t.promoId)],
);
