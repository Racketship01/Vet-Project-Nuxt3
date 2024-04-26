/* eslint-disable quotes */
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Only allow PUT, PATCH, or POST requests
    assertMethod(event, ["DELETE"]);

    // Get the route params
    const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

    const petIDSlug = slugCategory + "-" + slugPet;
    console.log(petIDSlug);

    const category = await prisma.category.findFirst({
      where: {
        slugCategory: slugCategory,
        petID: petIDSlug,
      },
      include: {
        pets: true,
      },
    });

    const [result] = await prisma.$transaction([
      prisma.category.delete({
        where: {
          id: category?.id,
        },
      }),
    ]);

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
