/* eslint-disable quotes */
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Get the route params
    const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

    const { id, remarks } = await readBody(event);

    // ------QUERIES
    const pet = await prisma.pet.findFirst({
      where: {
        slugPet: slugPet,
        Category: {
          slugCategory: slugCategory,
        },
      },
    });

    if (!pet) {
      throw createError({
        statusCode: 404,
        message: "Record not found",
      });
    }

    // ------ UPDATE

    const primary = await prisma.primaryVax.findFirst({
      where: {
        id: id,
        Pet: {
          slugPet: slugPet,
          Category: {
            slugCategory: slugCategory,
          },
        },
      },
    });

    const [primaryProgress] = await prisma.$transaction([
      prisma.primaryVax.update({
        where: {
          id: primary?.id,
        },
        data: {
          remarks,
        },
      }),
    ]);

    return primaryProgress;
  } catch (e) {
    console.log(e);
  }
});
