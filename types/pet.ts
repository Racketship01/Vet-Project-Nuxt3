import type { Pet, Owner, PrimaryVax } from "@prisma/client";

export type PetWithPath = Pet & {
  path: string;
};

export type Owner = Owner;
export type PrimaryVax = PrimaryVax;
