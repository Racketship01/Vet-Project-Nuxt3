import { PrismaClient } from "@prisma/client";
// import protectRoute from "~/server/utils/protectRoute";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // protectRoute(event);
  try {
    assertMethod(event, ["PUT", "POST", "PATCH"]);

    const {
      petName,
      slugPet,
      petID,
      petAge,
      breed,
      birth,
      gender,
      type,
      slugCategory,
      firstName,
      lastName,
      ownerAge,
      contact,
      address,
    } = await readBody(event);

    const clinic = await prisma.clinic.findFirst({
      where: {
        title: "Vueti-Vet",
      },
    });

    const category = await prisma.category.create({
      data: {
        type,
        slugCategory,
        Clinic: {
          connect: {
            id: clinic.id,
          },
        },
      },
    });

    const pet = await prisma.pet.create({
      data: {
        petName,
        slugPet,
        petAge,
        petID,
        breed,
        birth,
        gender,
        Category: {
          connect: {
            id: category.id,
          },
        },
      },
    });

    const owner = await prisma.owner.create({
      data: {
        firstName,
        lastName,
        ownerAge,
        contact,
        address,
        Pet: {
          connect: {
            id: pet.id,
          },
        },
      },
    });

    return { pet, category, owner, clinic };
  } catch (error) {
    console.log(error);
  }
});
