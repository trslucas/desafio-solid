import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: data.id ?? randomUUID(),
      responsable_name: data.responsable_name,
      email: data.email,
      cep: data.cep,
      whatsapp: data.whatsapp,
      address: data.address,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const orgAlreadyExists = this.orgs.find((org) => org.email === email)

    if (!orgAlreadyExists) return null

    return orgAlreadyExists
  }

  async findById(orgId: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.id === orgId)

    if (!org) return null

    return org
  }
}
