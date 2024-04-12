/* eslint-disable quotes */
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Get the route params
    const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

    const { id, age, date, weight, description, followUp, veterinarian } =
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

    // ------ UPDATE

    const annual = await prisma.annualVax.findFirst({
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

    const [annualUpdate] = await prisma.$transaction([
      prisma.annualVax.update({
        where: {
          id: annual?.id,
        },
        data: {
          age: +age,
          date,
          weight: +weight,
          description,
          followUp,
          veterinarian,
        },
      }),
    ]);

    return annualUpdate;
  } catch (e) {
    console.log(e);
  }
});
