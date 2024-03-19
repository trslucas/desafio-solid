import { hash } from 'bcryptjs'

import { InMemoryOrgsRepository } from '../repository/in-memory/in-memory-orgs-repository'
import { RegisterPetUseCase } from './register-pet'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repository/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository

let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)

    await orgsRepository.create({
      id: '1001',
      responsable_name: 'Lucas',
      email: 'trslucas@outlook.com',
      password_hash: await hash('Senha@2134', 6),
      address: 'Nilo Peçanha',
      cep: '20510290',
      whatsapp: '21965667088',
      created_at: new Date(),
    })
  })

  it('should be able to register a dog', async () => {
    const { dog } = await sut.execute({
      name: 'Nina',
      age: 1,
      city: 'Rio de Janeiro',
      description: 'Linda do pai',
      energyLevel: 1,
      environment: 1,
      independencyLevel: 1,
      orgId: '1001',
      size: 1,
    })

    expect(dog.id).toEqual(expect.any(String))
  })
})
