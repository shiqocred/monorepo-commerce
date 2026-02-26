import { t } from "elysia";

const loginBody = t.Object({
  email: t.String({
    format: "email",
    examples: ["m@gmail.com"],
    error: "Invalid Email",
  }),
  password: t.String({ examples: ["12345678"] }),
});
const registerBody = t.Object({
  name: t.String({ examples: ["Jhon Doe"] }),
  email: t.String({ format: "email", examples: ["m@gmail.com"] }),
  password: t.String({ examples: ["12345678"] }),
});

export const authModels = {
  "login.body": loginBody,
  "register.body": registerBody,
};

export const StaticModels = t.Object({
  login: t.Object({
    body: loginBody,
  }),
  register: t.Object({
    body: registerBody,
  }),
});

export type AuthStatic = typeof StaticModels.static;
