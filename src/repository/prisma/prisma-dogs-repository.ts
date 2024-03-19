import { Prisma } from '@prisma/client'
import { DogsRepository } from '../dogs-repository'
import { prisma } from '../../lib/prisma'

export class PrismaDogsRepository implements DogsRepository {
  async create(data: Prisma.DogUncheckedCreateInput) {
    const dog = await prisma.dog.create({
      data,
    })

    return dog
  }

  async findByState(city: string) {
    const dog = await prisma.dog.findMany({
      where: {
        city,
      },
    })

    return dog
  }
}
