/* eslint-disable indent */
/* eslint-disable quotes */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;

  const { id } = await readBody(event);

  const primaryVax = await prisma.primaryVax.findMany({
    where: {
      Pet: {
        slugPet: slugPet,
        Category: {
          slugCategory: slugCategory,
        },
      },
    },
    select: {
      id: true,
      remarks: true,
      Pet: {
        select: {
          slugPet: true,
          Category: {
            select: {
              slugCategory: true,
            },
          },
        },
      },
    },
  });

  const clinicOutline = await $fetch("/api/profile/meta");

  if (!clinicOutline) {
    throw createError({
      statusCode: 404,
      message: "Clinic outline not found",
    });
  }

  const progress = clinicOutline.categories.reduce(
    (clinic: any, category: any) => {
      clinic[category.slug] = category.pets.reduce(
        (category: any, Pet: any) => {
          category[Pet.slug] =
            primaryVax.find((progress) => (progress.id = id))?.remarks || false;

          return category;
        },
        {}
      );

      return clinic;
    },
    {}
  );

  return progress;
});
