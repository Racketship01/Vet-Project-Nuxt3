/* eslint-disable indent */
/* eslint-disable quotes */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

  const primaryVax = await prisma.primaryVax.findMany({
    where: {
      Pet: {
        slugPet: slugPet,
        Category: {
          slugCategory: slugCategory,
        },
      },
    },
  });

  if (!primaryVax) {
    throw createError({
      statusCode: 404,
      message: "Primary vaccine info not found",
    });
  }

  return {
    ...primaryVax,
  };
});
