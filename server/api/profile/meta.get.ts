import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const petSelect = Prisma.validator<Prisma.PetArgs>()({
  select: {
    petName: true,
    slugPet: true,
    breed: true,
  },
});

export type PetType = Prisma.PetGetPayload<typeof petSelect> & {
  path: string;
};

const categorySelect = Prisma.validator<Prisma.CategoryArgs>()({
  select: {
    type: true,
    slugCategory: true,
    petID: true,
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
      path: `/profile/category/${category.slugCategory}/pet/${pet.slugPet}`,
    })),
  }));

  return {
    ...outline,
    categories,
  };
});
