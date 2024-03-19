import { Pet, Prisma } from '@prisma/client'
import { DogsRepository } from '../dogs-repository'
import { prisma } from '../../lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async searchMany(city: string) {
    const pet = await prisma.pet.findMany({
      where: {
        city,
      },
    })

    return pet
  }

  async searchByCharacteristics({
    city,
    age,
    energy_level,
    environment,
    size,
  }: Partial<Pet>) {
    const where = {
      city,
      ...(age && { age }),
      ...(energy_level && { energy_level }),
      ...(environment && { environment }),
      ...(size && { size }),
    }

    const pets = await prisma.pet.findMany({
      where,
    })

    return pets
  }
}
