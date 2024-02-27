/* eslint-disable indent */
/* eslint-disable quotes */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

  const owner = await prisma.owner.findFirst({
    where: {
      Pet: {
        slugPet: slugPet,
        Category: {
          slugCategory: slugCategory,
        },
      },
    },
  });

  if (!owner) {
    throw createError({
      statusCode: 404,
      message: "Owner not found",
    });
  }

  return {
    ...owner,
  };
});
