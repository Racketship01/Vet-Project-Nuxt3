import type { Pet, Owner } from "@prisma/client";

export type PetWithPath = Pet & {
  path: string;
};

export type Owner = Owner;
