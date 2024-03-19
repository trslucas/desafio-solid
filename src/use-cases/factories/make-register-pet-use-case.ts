import { PrismaOrgRepository } from '../../repository/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '../../repository/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgRepository()
  const registerPetUseCase = new RegisterPetUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
  )

  return registerPetUseCase
}
