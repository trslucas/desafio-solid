import { beforeEach, describe, expect, it } from 'vitest'

import { ListPetsByCharacteristicsUseCase } from './list-pets-by-characteristics'
import { InMemoryPetsRepository } from '../repository/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository

let sut: ListPetsByCharacteristicsUseCase

describe('List Pets By Characteristics Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()

    sut = new ListPetsByCharacteristicsUseCase(petsRepository)
  })

  it('shoud be able to list pets by characteristics', async () => {
    await petsRepository.create({
      name: 'Mayara',
      age: 1,
      city: 'Rio de Janeiro',
      description: 'Linda do pai',
      energy_level: 1,
      environment: 1,
      independence_level: 1,
      org_id: '1001',
      size: 1,
      created_at: new Date(),
    })

    await petsRepository.create({
      name: 'Nina Colina',
      age: 1,
      city: 'Rio de Janeiro',
      description: 'Linda do pai',
      energy_level: 2,
      environment: 1,
      independence_level: 1,
      org_id: '1001',
      size: 1,
      created_at: new Date(),
    })

    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
    })
    expect(pets).toHaveLength(2)
  })
})
