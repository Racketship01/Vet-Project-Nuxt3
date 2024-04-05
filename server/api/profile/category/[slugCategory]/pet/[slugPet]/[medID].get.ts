/* eslint-disable indent */
/* eslint-disable quotes */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPetMedId } from "~/types/queries";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { slugCategory, slugPet, primaryID } = event.context
    .params as unknown as QueryCategoryPetMedId;

  const [result] = await prisma.$transaction([
    prisma.primaryVax.findFirst({
      where: {
        id: primaryID,
        Pet: {
          slugPet: slugPet,
          Category: {
            slugCategory: slugCategory,
          },
        },
      },
    }),
  ]);

  if (!result) {
    throw createError({
      statusCode: 404,
      message: "Primary vaccine info not found",
    });
  }

  return {
    ...result,
    path: `/profile/category/${slugCategory}/pet/${slugPet}/${primaryID}`,
  }; // return fetched pet with path
});
