import { Pet } from '@prisma/client'
import { PetsRepository } from '../repository/pets-repository'
import console from 'console'

interface ListPetsUseCaseRequest {
  state: string
}

interface ListPetsUseCaseResponse {
  pets: Pet[]
}

export class ListPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    state,
  }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(state)

    if (!pets) {
      throw new Error('Pets not found')
    }

    console.log(pets)
    return { pets }
  }
}
