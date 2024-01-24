import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.clinic.create({
    data: {
      title: "Vueti-Vet",
      categories: {
        create: [
          {
            type: "Canine",
            slugCategory: "CA",
            petID: "CA-SNO123456",
            pets: {
              create: [
                {
                  petName: "Snoopy",
                  slugPet: "SNO123456",
                  petAge: 1,
                  breed: "Aspin",
                  birth: 1 / 7 / 2023,
                  gender: "Female",
                  owner: {
                    create: [
                      {
                        firstName: "Mel",
                        lastName: "Montes",
                        ownerAge: 15,
                        contact: 123456789,
                        address: "Baguio City",
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
