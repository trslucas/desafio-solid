import { Pet } from '@prisma/client'
import { PetsRepository } from '../repository/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ListAPetUseCaseRequest {
  petId: string
}

interface ListAPetUseCaseResponse {
  pet: Pet
}

export class ListAPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: ListAPetUseCaseRequest): Promise<ListAPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
