import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { statusRoleEnum, personalIdEnum, userRoleEnum } from "./enums";
import { user } from "./users";

export const userDetail = pgTable(
  "user_detail",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    role: userRoleEnum("role").notNull(),

    personalIdType: personalIdEnum("personal_id_type"),

    personalIdFile: text("personal_id_file"),
    veterinarianIdFile: text("veterinarian_id_file"),
    storefrontFile: text("storefront_file"),

    personalId: text("personal_id"),
    veterinarianId: text("veterinarian_id"),
    fullName: text("full_name"),

    message: text("message"),
    status: statusRoleEnum("status").notNull(),
    reviewedBy: varchar("reviewed_by", { length: 128 }),
    reviewedAt: timestamp("reviewed_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("one_active_role_per_user")
      .on(table.userId, table.role)
      .where(sql`status = 'APPROVED'`),
  ],
);
