import { Pet } from '@prisma/client'

import { OrgsRepository } from '../repository/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '../repository/pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  city: string
  description: string
  age: number
  size: number
  energyLevel: number
  independencyLevel: number
  environment: number
  requisits: string[]
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    city,
    description,
    age,
    size,
    energyLevel,
    independencyLevel,
    requisits,
    environment,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      city,
      description,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independencyLevel,
      environment,
      org_id: org.id,
      requisits,
      created_at: new Date(),
    })
    return { pet }
  }
}
