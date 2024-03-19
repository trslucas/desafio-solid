import { Dog, Prisma } from '@prisma/client'
import { DogsRepository } from '../dogs-repository'
import { randomUUID } from 'crypto'

export class InMemoryDogsRepository implements DogsRepository {
  public dogs: Dog[] = []

  async create(data: Prisma.DogUncheckedCreateInput): Promise<Dog> {
    const dog = {
      id: randomUUID(),
      name: data.name,
      city: data.city,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.dogs.push(dog)

    console.log(dog)
    return dog
  }

  async findByState(city: string) {
    if (!city) {
      throw new Error('City not found')
    }
    const dog = this.dogs.filter((dog) => dog.city.includes(city))

    if (!dog) {
      return null
    }

    return dog
  }
}
