import { Org } from '@prisma/client'
import { OrgsRepository } from '../repository/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists'

interface RegisterOrgUseCaseRequest {
  responsable_name: string
  email: string
  cep: string
  address: string
  whatsapp: string
  password: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    responsable_name,
    email,
    cep,
    address,
    whatsapp,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }
    const org = await this.orgsRepository.create({
      responsable_name,
      email,
      cep,
      address,
      whatsapp,
      password_hash,
    })

    return {
      org,
    }
  }
}
