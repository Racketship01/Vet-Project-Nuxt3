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
        petID,
        Clinic: {
          connect: {
            id: clinic?.id,
          },
        },
      },
    });

    const pet = await prisma.pet.create({
      data: {
        petName,
        slugPet,
        petAge,
        breed,
        birth: String(birth),
        gender,
        uploadURL:
          "https://xnoymaqkppyjzdezajin.supabase.co/storage/v1/object/public/Pictures/profile/Logo-Vet.jpg",
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
