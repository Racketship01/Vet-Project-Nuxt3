import { PrismaClient, Prisma } from "@prisma/client";
import { QueryCategoryPet } from "~/types/queries";

const prisma = new PrismaClient();

const primaryVaxSelect = Prisma.validator<Prisma.PrimaryVaxArgs>()({
  select: {
    id: true,
    age: true,
    date: true,
    weight: true,
    description: true,
    followUp: true,
    veterinarian: true,
    remarks: true,
  },
});

export type PrimaryVaxType = Prisma.PrimaryVaxGetPayload<
  typeof primaryVaxSelect
> & {
  path: string;
};

const petSelect = Prisma.validator<Prisma.PetArgs>()({
  select: {
    slugPet: true,
    primaryVax: primaryVaxSelect,
  },
});

export type PetType = Omit<
  Prisma.PetGetPayload<typeof petSelect>,
  "primaryVax"
> & {
  primaryVax: PrimaryVaxType[];
};

const categorySelect = Prisma.validator<Prisma.CategoryArgs>()({
  select: {
    slugCategory: true,
    pets: petSelect,
  },
});

export type CategoryType = Omit<
  Prisma.CategoryGetPayload<typeof categorySelect>,
  "pets"
> & {
  pets: PetType[];
};

const clinicSelect = Prisma.validator<Prisma.ClinicArgs>()({
  select: {
    title: true,
    categories: categorySelect,
  },
});

export type ClinicType = Omit<
  Prisma.ClinicGetPayload<typeof clinicSelect>,
  "categories"
> & {
  categories: CategoryType[];
};

export default defineEventHandler(async (event): Promise<ClinicType> => {
  const { slugCategory, slugPet } = event.context.params as QueryCategoryPet;
  const outline = await prisma.clinic.findFirst(clinicSelect);

  if (!outline) {
    throw createError({
      statusCode: 404,
      statusMessage: "Clinic not found",
    });
  }

  const categories = outline.categories.map((category) => ({
    ...category,
    pets: category.pets.map((pet) => ({
      ...pet,
      primaryVax: pet.primaryVax.map((vax) => ({
        ...vax,
        path: `/profile/category/${category.slugCategory}/pet/${pet.slugPet}/${vax.id}`,
      })),
    })),
  }));

  const pet = categories.map((c) => ({
    pets: c.pets.filter((pet) => {
      const p = pet?.slugPet;

      return p.includes(slugPet);
    }),
  }));

  const primaryVax = pet.map((pet) => ({
    pets: pet.pets.map((p) => ({
      primaryVax: p.primaryVax.map((vax) => ({
        ...vax,
      })),
    })),
  }));

  return { primaryVax };
});
