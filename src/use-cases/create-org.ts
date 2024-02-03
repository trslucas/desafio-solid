import { Org } from '@prisma/client'
import { OrgsRepository } from '../repository/orgs-repository'

interface CreateOrgUseCaseRequest {
  responsable_name: string
  email: string
  cep: string
  address: string
  whatsapp: string
  password_hash: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class OrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    responsable_name,
    email,
    cep,
    address,
    whatsapp,
    password_hash,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
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
