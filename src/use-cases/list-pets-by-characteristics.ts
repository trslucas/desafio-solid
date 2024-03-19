import { Pet } from '@prisma/client'
import { PetsRepository } from '../repository/pets-repository'

interface ListPetsByCharacteristicsUseCaseRequest {
  city: string
  age?: number
  energy_level?: number
  environment?: number
  size?: number
}

interface ListPetsByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class ListPetsByCharacteristicsUseCase {
  constructor(private dogsRepository: DogsRepository) {}

  async execute({
    city,
    age,
    energy_level,
    environment,
    size,
  }: ListPetsByCharacteristicsUseCaseRequest): Promise<ListPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.dogsRepository.searchByCharacteristics({
      city,
      age,
      energy_level,
      environment,
      size,
    })

    if (!pets) {
      throw new Error('Pets not found')
    }

    return {
      pets,
    }
  }
}
