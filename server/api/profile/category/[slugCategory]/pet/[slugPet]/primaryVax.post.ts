/* eslint-disable quotes */
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Get the route params
    const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

    const { age, date, weight, description, followUp, veterinarian, remarks } =
      await readBody(event);

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

    // ------ INSERT

    const [primaryCreate] = await prisma.$transaction([
      prisma.primaryVax.create({
        data: {
          age: +age,
          date,
          weight: +weight,
          description,
          followUp,
          veterinarian,
          remarks,
          Pet: {
            connect: {
              id: pet?.id,
            },
          },
        },
      }),
    ]);

    return primaryCreate;
  } catch (e) {
    console.log(e);
  }
});
