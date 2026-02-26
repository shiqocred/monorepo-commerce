import { relations } from "drizzle-orm";

import { account } from "./accounts";
import { session } from "./sessions";
import { user } from "./users";
import { userDetail } from "./user-details";
import { product } from "./products";
import { category } from "./categories";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  userDetail: many(userDetail),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const userDetailRelations = relations(userDetail, ({ one }) => ({
  user: one(user, {
    fields: [userDetail.userId],
    references: [user.id],
  }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
}));

export const productRelations = relations(product, ({ one }) => ({
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
}));
