import Elysia from "elysia";
import { categoryModels } from "./models";
import { toWebp } from "imgkit";
import slug from "slug";
import { createId } from "@paralleldrive/cuid2";
import { category, db } from "@/lib/db";
import { successRes } from "@/lib/utils";
import { imageUrl } from "@/config";

export const createCategory = new Elysia().model(categoryModels).post(
  "/",
  async ({ body }) => {
    const { image, name } = body;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const webpImage = await toWebp(buffer, { quality: 80 });

    const categoryId = createId();

    const safeName = `/categories/${categoryId}-${Date.now()}.webp`;
    const path = `./public/images${safeName}`;

    await Bun.write(path, webpImage);

    const [response] = await db
      .insert(category)
      .values({ name, slug: slug(name), image: safeName })
      .returning();

    const formattedResponse = {
      ...response,
      image: response.image ? `${imageUrl}${response.image}` : null,
    };

    return successRes(formattedResponse, "Category created successfully");
  },
  {
    body: "create.body",
  },
);
