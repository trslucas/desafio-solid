import { Dog } from '@prisma/client'
import { DogsRepository } from '../repository/dogs-repository'
import { OrgsRepository } from '../repository/orgs-repository'

interface RegisterDogUseCaseRequest {
  name: string
  city: string
  description: string
  age: number
  size: number
  energyLevel: number
  independencyLevel: number
  environment: number
  orgId: string
}

interface RegisterDogUseCaseResponse {
  dog: Dog
}

export class RegisterDogUseCase {
  constructor(
    private dogsRepository: DogsRepository,
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
    environment,
    orgId,
  }: RegisterDogUseCaseRequest): Promise<RegisterDogUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new Error('Falha de resource')
    }

    const dog = await this.dogsRepository.create({
      name,
      city,
      description,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independencyLevel,
      environment,
      org_id: org.id,
      created_at: new Date(),
    })
    return { dog }
  }
}
