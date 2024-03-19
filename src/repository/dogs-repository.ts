import { Prisma, Dog } from '@prisma/client'

export interface DogsRepository {
  create(data: Prisma.DogUncheckedCreateInput): Promise<Dog>
  findByState(city: string): Promise<Dog[] | null>
}
