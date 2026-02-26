import { Elysia } from "elysia";

import { adminAuth } from "./auth";
import { createAuthInstance } from "@/lib/auth";
import { adminCategories } from "./categories";

export const auth = createAuthInstance("/admin/auth");

export const adminPath = new Elysia({ prefix: "/admin" })
  .use(adminAuth)
  .use(adminCategories);
