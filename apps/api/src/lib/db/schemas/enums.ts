import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role_enum", [
  "AGENT",
  "PET_SHOP",
  "VET_CLINIC",
  "SUPER_ADMIN",
  "ADMIN",
]);

export const personalIdEnum = pgEnum("personal_id_enum", [
  "NIK",
  "NIB",
  "NPWP",
]);

export const statusRoleEnum = pgEnum("status_role_enum", [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "EXPIRED",
]);

export const bannerEnum = pgEnum("banner_enum", [
  "DETAIL",
  "PETS",
  "PROMOS",
  "SUPPLIERS",
  "CATEGORIES",
]);

export const discountApplyEnum = pgEnum("discount_apply_enum", [
  "categories",
  "suppliers",
  "pets",
  "products",
]);

export const discountValueEnum = pgEnum("discount_value_enum", [
  "percentage",
  "fixed",
]);

export const discountMinRequirementEnum = pgEnum(
  "discount_min_requirement_enum",
  ["amount", "quantity"],
);

export const discountEligibilityEnum = pgEnum("discount_eligibility_enum", [
  "user",
  "role",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "PENDING",
  "PAID",
  "EXPIRED",
  "CANCELLED",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "WAITING_PAYMENT", // Menunggu pembayaran
  "PACKING", // Dikemas
  "SHIPPING", // Dikirim
  "DELIVERED", // Selesai
  "EXPIRED", // Selesai
  "CANCELLED", // Dibatalkan
]);

export const stockTypeEnum = pgEnum("stock_type_enum", [
  "IN",
  "OUT",
  "ADJUST_PLUS",
  "ADJUST_MINUS",
  "TRANSFER_IN",
  "TRANSFER_OUT",
]);
