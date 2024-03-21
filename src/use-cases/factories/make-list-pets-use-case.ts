import { PrismaPetsRepository } from '../../repository/prisma/prisma-pets-repository'
import { ListPetsUseCase } from '../list-pets'

export function makeListPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const listPetsUseCase = new ListPetsUseCase(prismaPetsRepository)

  return listPetsUseCase
}
