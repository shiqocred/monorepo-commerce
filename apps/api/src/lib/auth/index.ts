import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer, jwt } from "better-auth/plugins";

import { db } from "@/lib/db";

export const createAuthInstance = (basePath: string) =>
  betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    experimental: { joins: true },
    basePath,

    plugins: [bearer(), jwt()],

    emailAndPassword: {
      enabled: true,
      // disableSignUp: true,
      autoSignIn: false,
      password: {
        hash: async (password) => {
          const result = await Bun.password.hash(password, {
            memoryCost: 65536,
            algorithm: "argon2id",
            timeCost: 3,
          });
          return result;
        },
        verify: async (data: { password: string; hash: string }) => {
          const { password, hash } = data;
          const result = await Bun.password.verify(password, hash, "argon2id");
          return result;
        },
      },
    },

    session: {
      expiresIn: 60 * 60 * 24,
      updateAge: 60 * 60 * 12,
      cookieCache: {
        enabled: false, // Matikan cache agar tes lebih akurat ke Database
      },
    },

    rateLimit: {
      enabled: true,
      storage: "database",
    },
  });
