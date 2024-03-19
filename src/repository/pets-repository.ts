import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  searchMany(city: string): Promise<Pet[] | null>
  searchByCharacteristics({
    city,
    age,
    energy_level,
    environment,
    size,
  }: Partial<Pet>): Promise<Pet[] | null>
}
