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
      id,
      age,
      date,
      weight,
      description,
      followUp,
      veterinarian,
      remarks,
    } = await readBody(event);

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

    const primary = await prisma.primaryVax.findUnique({
      where: {
        id,
        Pet: {
          slugPet: slugPet,
          Category: {
            slugCategory: slugCategory,
          },
        },
      },
    });

    const annual = await prisma.annualVax.findFirst({
      where: {
        Pet: {
          slugPet: slugPet,
          Category: {
            slugCategory: slugCategory,
          },
        },
      },
    });

    const medical = await prisma.medicalHx.findFirst({
      where: {
        Pet: {
          slugPet: slugPet,
          Category: {
            slugCategory: slugCategory,
          },
        },
      },
    });

    // ------ INSERT AND UPDATE

    const primaryVax = async () => {
      try {
        if (primary) {
          await prisma.primaryVax.update({
            where: {
              id: primary?.id,
            },
            data: {
              age: +age,
              date,
              weight: +weight,
              description,
              followUp,
              veterinarian,
              remarks,
            },
          });
        } else {
          await prisma.primaryVax.create({
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
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    // const annualVax = async () => {
    //   if (annual) {
    //     await prisma.annualVax.update({
    //       where: {
    //         id: annual.id,
    //       },
    //       data: {
    //         age,
    //         date,
    //         weight,
    //         description,
    //         followUp,
    //         veterinarian,
    //       },
    //     });
    //   } else {
    //     await prisma.annualVax.create({
    //       data: {
    //         age,
    //         date,
    //         weight,
    //         description,
    //         followUp,
    //         veterinarian,
    //         Pet: {
    //           connect: {
    //             id: pet?.id,
    //           },
    //         },
    //       },
    //     });
    //   }
    // };

    // const medicalHx = async () => {
    //   if (medical) {
    //     await prisma.medicalHx.update({
    //       where: {
    //         id: medical.id,
    //       },
    //       data: {
    //         age,
    //         date,
    //         weight,
    //         description,
    //         followUp,
    //         veterinarian,
    //       },
    //     });
    //   } else {
    //     await prisma.medicalHx.create({
    //       data: {
    //         age,
    //         date,
    //         weight,
    //         description,
    //         followUp,
    //         veterinarian,
    //         Pet: {
    //           connect: {
    //             id: pet?.id,
    //           },
    //         },
    //       },
    //     });
    //   }
    // };

    //return [primaryVax(), annualVax(), medicalHx()];
    return primaryVax();
  } catch (e) {
    console.log(e);
  }
});
