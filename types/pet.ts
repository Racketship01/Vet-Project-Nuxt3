import type {
  Pet,
  Owner,
  PrimaryVax,
  AnnualVax,
  MedicalHx,
} from "@prisma/client";

export type PetWithPath = Pet & {
  path: string;
};

export type Owner = Owner;
export type PrimaryVax = PrimaryVax;
export type AnnualVax = AnnualVax;
export type MedicalHx = MedicalHx;
