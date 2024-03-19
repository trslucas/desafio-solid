import { Pet, Prisma } from '@prisma/client'

import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-error'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      city: data.city,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      requisits: (data.requisits as string[]) ?? [],
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.pets.push(pet)

    return pet
  }

  async findById(petId: string) {
    if (!petId) {
      throw new ResourceNotFoundError()
    }

    const pet = this.pets.find((pet) => pet.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany(city: string) {
    if (!city) {
      throw new Error('City not found')
    }
    const pet = this.pets.filter((pet) => pet.city.includes(city))

    if (!pet) {
      return null
    }

    return pet
  }

  async searchByCharacteristics({
    city,
    age,
    energy_level,
    environment,
    size,
  }: Pet) {
    const searchedPet = this.pets.filter((pet) => {
      return (
        pet.city === city &&
        (!age || pet.age === age) &&
        (!energy_level || pet.energy_level === energy_level) &&
        (!environment || pet.environment === environment) &&
        (!size || pet.size === size)
      )
    })

    return searchedPet
  }
}
