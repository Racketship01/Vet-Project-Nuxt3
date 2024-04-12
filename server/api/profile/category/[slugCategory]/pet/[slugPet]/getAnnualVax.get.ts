/* eslint-disable indent */
/* eslint-disable quotes */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

  const annualVax = await prisma.annualVax.findMany({
    where: {
      Pet: {
        slugPet: slugPet,
        Category: {
          slugCategory: slugCategory,
        },
      },
    },
    orderBy: { id: "desc" },
  });

  if (!annualVax) {
    throw createError({
      statusCode: 404,
      message: "Primary vaccine info not found",
    });
  }

  return {
    ...annualVax,
  };
});
