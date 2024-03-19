import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repository/in-memory/in-memory-pets-repository'
import { ListAPetUseCase } from './list-a-pet'

let petsRepository: InMemoryPetsRepository
let sut: ListAPetUseCase

describe('List A Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()

    sut = new ListAPetUseCase(petsRepository)
  })

  it('should be able to find a pet by ID', async () => {
    const createdPet = await petsRepository.create({
      name: 'Nina Colina',
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

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })
    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Nina Colina')
  })
})
