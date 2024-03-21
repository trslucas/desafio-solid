import { PrismaOrgRepository } from '../../repository/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '../register-org'

export function makeRegisterOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(prismaOrgsRepository)

  return registerOrgUseCase
}
