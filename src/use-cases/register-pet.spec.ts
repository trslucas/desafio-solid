import { hash } from 'bcryptjs'
import { InMemoryDogsRepository } from '../repository/in-memory/in-memory-dogs-repository'
import { InMemoryOrgsRepository } from '../repository/in-memory/in-memory-orgs-repository'
import { RegisterDogUseCase } from './register-pet'
import { beforeEach, describe, expect, it } from 'vitest'

let dogsRepository: InMemoryDogsRepository
let orgsRepository: InMemoryOrgsRepository

let sut: RegisterDogUseCase

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    dogsRepository = new InMemoryDogsRepository()
    orgsRepository = new InMemoryOrgsRepository() // Adicione esta linha para inicializar o orgsRepository
    sut = new RegisterDogUseCase(dogsRepository, orgsRepository)

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
