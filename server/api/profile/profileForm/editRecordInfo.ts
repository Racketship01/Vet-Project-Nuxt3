/* eslint-disable quotes */
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Only allow PUT, PATCH, or POST requests
    assertMethod(event, ["PUT", "PATCH", "POST"]);

    // Get the route params
    const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

    const {
      petName,
      petAge,
      breed,
      birth,
      gender,
      type,
      firstName,
      lastName,
      ownerAge,
      contact,
      address,
    } = await readBody(event);

    // const petAgeUpdate =
    //   typeof petAge === "number" ? petAge : Number.parseInt(petAge);

    const pet = await prisma.pet.findFirst({
      where: {
        slugPet: slugPet,
        Category: {
          slugCategory: slugCategory,
        },
      },
    });

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

    const result = await prisma.pet.update({
      where: {
        id: pet?.id,
      },
      data: {
        petName,
        petAge,
        breed,
        birth,
        gender,
        Category: {
          update: {
            where: {
              id: category?.id,
            },
            data: {
              type,
            },
          },
        },
        owner: {
          update: {
            where: {
              id: owner?.id,
            },
            data: {
              firstName,
              lastName,
              ownerAge,
              contact,
              address,
            },
          },
        },
      },
      include: {
        Category: true,
        owner: true,
      },
    });

    return result;
  } catch (e) {
    console.log(e);
  }
});
