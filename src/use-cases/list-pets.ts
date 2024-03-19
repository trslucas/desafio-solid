import { Pet } from '@prisma/client'
import { PetsRepository } from '../repository/pets-repository'

interface ListPetsUseCaseRequest {
  city: string
}

interface ListPetsUseCaseResponse {
  pets: Pet[]
}

export class ListPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(city)

    if (!pets) {
      throw new Error('Pets not found')
    }

    return {
      pets,
    }
  }
}
