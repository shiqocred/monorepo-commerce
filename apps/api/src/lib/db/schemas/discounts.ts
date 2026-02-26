import {
  pgTable,
  text,
  boolean,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import {
  discountApplyEnum,
  discountEligibilityEnum,
  discountMinRequirementEnum,
  discountValueEnum,
} from "./enums";

export const discount = pgTable("discounts", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),

  code: text("code").unique().notNull(),

  apply: discountApplyEnum("apply").notNull(),

  valueType: discountValueEnum("value_type").notNull(), // fixed / percentage
  value: integer("value").notNull(),

  // Minimum requirement
  minimumType: discountMinRequirementEnum("minimum_type"),
  minimum: integer("minimum"),

  eligibilityType: discountEligibilityEnum("eligibility_type"),

  // Voucher limitation (optional if type === "VOUCHER")
  maxTotalUse: integer("max_total_use"),
  maxUserOnce: boolean("max_user_once").default(false).notNull(),

  // Dates
  startAt: timestamp("start_at").notNull(),
  endAt: timestamp("end_at"),

  deletedAt: timestamp("deleted_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
