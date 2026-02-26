import cors from "@elysiajs/cors";
import openapi from "@elysiajs/openapi";
import { APIError } from "better-auth/api";
import { Elysia } from "elysia";

import { adminPath } from "./admin";
import { AuthStatic } from "./admin/auth/models";
import { adminUrl, tokoUrl } from "./config";
import { errorRes } from "./lib/utils";
import staticPlugin from "@elysiajs/static";
import { CategoryStatic } from "./admin/categories/models";

export const app = new Elysia()
  .use(cors({ origin: [adminUrl, tokoUrl], credentials: true }))
  .use(openapi())
  .onError(({ error, set, code }) => {
    console.log(error);
    if (error instanceof APIError) {
      set.status = error.statusCode;
      return errorRes(null, error.body?.message || "Authentication Error");
    }
    if (code === "VALIDATION") {
      const validationErrors = error.all.map((err) => ({
        key: err.path.startsWith("/") ? err.path.slice(1) : err.path,
        message: err.schema.error ?? err.message,
      }));
      set.status = 400;
      return errorRes(validationErrors, "Validation Error");
    }

    set.status = 500;
    return errorRes(null, "Internal Server Error");
  })
  .use(await staticPlugin({ prefix: "/" }))
  .use(adminPath)
  .listen(3002);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type AppModels = {
  auth: AuthStatic;
  categories: CategoryStatic;
};

export type App = typeof app;
