import { Elysia } from "elysia";
import { auth } from "..";
import { errorRes } from "@/lib/utils";
import { categoryModels } from "./models";
import { categoriesList } from "./list";
import { createCategory } from "./create";
import bearer from "@elysiajs/bearer";
import { apiUrl } from "@/config";

export const adminCategories = new Elysia({ prefix: "/categories" })
  .model(categoryModels)
  .use(bearer())
  .guard(
    {
      beforeHandle: async ({ bearer, set }) => {
        if (!bearer) {
          set.status = 401;
          return errorRes(null, "Unauthorized");
        }

        const response = await auth.api.verifyJWT({
          body: { token: bearer, issuer: apiUrl },
        });

        if (!response || !response.payload) {
          set.status = 401;
          return errorRes(null, "Unauthorized");
        }
        const payload = response.payload;

        const formattedResponse = {
          id: payload.id,
          name: payload.name,
          email: payload.email,
        };

        return formattedResponse;
      },
    },
    (app) => app.use(categoriesList).use(createCategory),
  );
