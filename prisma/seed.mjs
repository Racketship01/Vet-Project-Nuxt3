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
                  birth: "2023-01-07",
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
                  primaryVax: {
                    create: [
                      {
                        age: 1,
                        date: "2023-01-07",
                        weight: 10,
                        description: "5in1 vaccine",
                        followUp: "2023-01-07",
                        veterinarian: "Doc Jacob",
                        remarks: true,
                      },
                    ],
                  },
                  annualVax: {
                    create: [
                      {
                        age: 1,
                        date: "2023-01-07",
                        weight: 10,
                        description: "anti-rabies vaccine",
                        followUp: "2023-01-07",
                        veterinarian: "Doc Jacob",
                      },
                    ],
                  },
                  medicalHx: {
                    create: [
                      {
                        age: 1,
                        date: "2023-01-07",
                        weight: 10,
                        description: "Cough and flu consultation",
                        followUp: "2023-01-07",
                        veterinarian: "Doc Jacob",
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
