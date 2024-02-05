import { InMemoryOrgsRepository } from '../repository/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register-org'
import { describe, expect, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register a Org', async () => {
    const { org } = await sut.execute({
      address: 'Avenida Nilo Peçanha',
      cep: '25010189',
      email: 'trslucas@outlook.com',
      password: 'Senha@2134',
      responsable_name: 'Lucas Trindade',
      whatsapp: '21965667088',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be able to hash org password after registration', async () => {
    const { org } = await sut.execute({
      address: 'Avenida Nilo Peçanha',
      cep: '25010189',
      email: 'trslucas@outlook.com',
      password: 'Senha@2134',
      responsable_name: 'Lucas Trindade',
      whatsapp: '21965667088',
    })

    const isOrgPasswordCorrectlyHashed = await compare(
      'Senha@2134',
      org.password_hash,
    )

    expect(isOrgPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a org with a exists email', async () => {
    const email = 'trslucas@outlook.com'

    await sut.execute({
      address: 'Avenida Nilo Peçanha',
      cep: '25010189',
      email,
      password: 'Senha@2134',
      responsable_name: 'Lucas Trindade',
      whatsapp: '21965667088',
    })

    await expect(() =>
      sut.execute({
        address: 'Avenida Nilo Peçanha',
        cep: '25010189',
        email,
        password: 'Senha@2134',
        responsable_name: 'Lucas Trindade',
        whatsapp: '21965667088',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
