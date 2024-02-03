import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
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
}
