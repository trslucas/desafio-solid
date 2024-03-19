import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryOrgsRepository } from '../repository/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'

import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      address: 'Avenida Nilo Peçanha',
      cep: '25010189',
      email: 'trslucas@outlook.com',
      password_hash: await hash('Senha@2134', 6),
      responsable_name: 'Lucas Trindade',
      whatsapp: '21965667088',
      created_at: new Date(),
    })

    const { org } = await sut.execute({
      email: 'trslucas@outlook.com',
      password: 'Senha@2134',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be not able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'trslucas@dasdasd.com',
        password: 'Senha@2134',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      address: 'Avenida Nilo Peçanha',
      cep: '25010189',
      email: 'trslucas@thummi.com',
      password_hash: await hash('Senha@2134', 6),
      responsable_name: 'Lucas Trindade',
      whatsapp: '21965667088',
      created_at: '',
    })

    await expect(() =>
      sut.execute({
        email: 'trslucas@thumi.com',
        password: 'Senha@2134',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
