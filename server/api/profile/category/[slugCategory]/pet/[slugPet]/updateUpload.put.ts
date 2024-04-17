/* eslint-disable quotes */
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Get the route params
    const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

    const { uploadURL } = await readBody(event);

    const pet = await prisma.pet.findFirst({
      where: {
        slugPet: slugPet,
        Category: {
          slugCategory: slugCategory,
        },
      },
    });

    const result = await prisma.pet.update({
      where: {
        id: pet?.id,
      },
      data: {
        uploadURL,
      },
    });

    if (!result) {
      throw createError({
        statusCode: 404,
        message: "Record not found",
      });
    }

    return result;
  } catch (e) {
    console.log(e);
  }
});
