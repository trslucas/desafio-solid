import { Pet } from '@prisma/client'
import { PetsRepository } from '../repository/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy_level,
    environment,
    size,
  }: ListPetsByCharacteristicsUseCaseRequest): Promise<ListPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.searchByCharacteristics({
      city,
      age,
      energy_level,
      environment,
      size,
    })

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
