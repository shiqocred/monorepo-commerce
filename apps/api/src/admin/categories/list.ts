import Elysia from "elysia";
import { db, category, product } from "@/lib/db";
import { and, asc, count, desc, eq, ilike, isNull } from "drizzle-orm";
import { categoryModels } from "./models";
import {
  buildPaginationMeta,
  buildPaginationParams,
  successRes,
} from "@/lib/utils";
import { imageUrl } from "@/config";

const sortField = (s: string) => {
  if (s === "name") return category.name;
  if (s === "slug") return category.slug;
  if (s === "products") return count(product.id);
  return category.createdAt;
};

export const categoriesList = new Elysia().model(categoryModels).get(
  "/",
  async ({ query }) => {
    const { q, sort, order, limit, page } = query;
    const { currentPage, perPage, offset } = buildPaginationParams(page, limit);

    const conditions = [];
    conditions.push(ilike(category.name, `%${q}%`));
    conditions.push(isNull(category.deletedAt));

    const whereCondition =
      conditions.length > 0 ? and(...conditions) : undefined;

    const productCount = db
      .select({
        categoryId: product.categoryId,
        total: count(product.id).as("total"),
      })
      .from(product)
      .where(isNull(product.deletedAt))
      .groupBy(product.categoryId)
      .as("productCount");

    const categoriesRes = await db
      .select({
        id: category.id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        totalProducts: productCount.total,
      })
      .from(category)
      .leftJoin(productCount, eq(productCount.categoryId, category.id))
      .where(whereCondition)
      .orderBy(order === "desc" ? desc(sortField(sort)) : asc(sortField(sort)))
      .limit(limit)
      .offset(offset);

    const totalRes = await db
      .select({ total: count() })
      .from(category)
      .where(whereCondition);

    const total = totalRes[0]?.total ?? 0;

    const pagination = buildPaginationMeta({
      total,
      currentPage,
      perPage,
    });

    const response = {
      data: categoriesRes.map((item) => ({
        ...item,
        image: item.image ? `${imageUrl}${item.image}` : null,
      })),
      pagination,
    };

    return successRes(response, "Retrieve Categories List");
  },
  {
    query: "list.query",
  },
);
