import { Elysia } from "elysia";

import { authModels } from "./models";
import { errorRes, successRes } from "@/lib/utils";
import { db, userDetail } from "@/lib/db";
import { auth } from "..";
import bearer from "@elysiajs/bearer";
import { apiUrl } from "@/config";

export const adminAuth = new Elysia({ prefix: "/auth" })
  .model(authModels)
  .use(bearer())
  .post(
    "/login",
    async ({ body: { email, password }, set }) => {
      const isAdmin = await db.query.user.findFirst({
        where: (u, { eq, and, isNull }) =>
          and(eq(u.email, email), isNull(u.deletedAt)),
        columns: { id: true },
        with: {
          userDetail: {
            columns: { id: true },
            where: (ud, { eq }) => eq(ud.role, "ADMIN"),
          },
        },
      });
      if (!isAdmin) {
        set.status = 401;
        return errorRes(null, "Invalid email or password");
      }
      const response = await auth.api.signInEmail({
        body: { email, password },
      });

      const token = await auth.api.getToken({
        headers: { Authorization: response.token },
      });

      const responseFormatted = {
        token: token.token,
        user: response.user,
      };

      return successRes(responseFormatted, "User logged in successfully");
    },
    { body: "login.body" },
  )
  .post(
    "/signup",
    async ({ body: { name, email, password } }) => {
      const response = await auth.api.signUpEmail({
        body: { name, email, password },
      });
      await db.insert(userDetail).values({
        userId: response.user.id,
        role: "ADMIN",
        status: "APPROVED",
      });
      const responseFormatted = {
        token: response.token,
        user: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          role: "Admin",
        },
      };
      return successRes(responseFormatted, "Admin registered successfully");
    },
    { body: "register.body" },
  )
  .get("/session", async ({ bearer, set }) => {
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

    return successRes(formattedResponse, "Session retrieved successfully");
  })
  .post("/logout", async ({ request: { headers }, set }) => {
    const response = await auth.api.signOut({ headers });
    if (!response) {
      set.status = 500;
      return errorRes(null, "Internal Server Error");
    }
    return successRes(null, "Logout successfully");
  });
