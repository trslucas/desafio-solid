import { PrismaPetsRepository } from '../../repository/prisma/prisma-pets-repository'
import { ListAPetUseCase } from '../list-a-pet'

export function makeListAPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const listAPetUseCase = new ListAPetUseCase(prismaPetsRepository)

  return listAPetUseCase
}
