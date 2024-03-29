/* eslint-disable indent */
/* eslint-disable quotes */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

  const [pet] = await prisma.$transaction([
    prisma.pet.findFirst({
      where: {
        slugPet: slugPet,
        Category: {
          slugCategory: slugCategory,
        },
      },
    }),
  ]);

  if (!pet) {
    throw createError({
      statusCode: 404,
      message: "Pet not found",
    });
  }

  return {
    ...pet,
    path: `/profile/category/${slugCategory}/pet/${slugPet}`,
  }; // return fetched pet with path
});
