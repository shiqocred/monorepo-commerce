import { Elysia } from "elysia";

const adminDashboard = new Elysia({ prefix: "/dashboard" }).get(
  "/",
  async () => {},
);
