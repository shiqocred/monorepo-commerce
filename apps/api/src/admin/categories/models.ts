import { t } from "elysia";

// q, sort, order, limit, page
const listQuery = t.Object({
  q: t.String({ default: "" }),
  sort: t.String({ default: "created" }),
  order: t.String({ default: "desc" }),
  limit: t.Number({ default: 10 }),
  page: t.Number({ default: 1 }),
});
const createBody = t.Object({
  image: t.File(),
  name: t.String({ minLength: 3 }),
});

export const categoryModels = {
  "list.query": listQuery,
  "create.body": createBody,
};

export const StaticModels = t.Object({
  list: t.Object({
    query: listQuery,
  }),
  create: t.Object({
    body: createBody,
  }),
});

export type CategoryStatic = typeof StaticModels.static;
