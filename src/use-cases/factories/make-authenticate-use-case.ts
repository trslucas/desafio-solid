import { PrismaOrgRepository } from '../../repository/prisma/prisma-orgs-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgRepository()

  const authenticateUseCase = new AuthenticateUseCase(prismaOrgsRepository)

  return authenticateUseCase
}
