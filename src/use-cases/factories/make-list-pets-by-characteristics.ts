import { PrismaPetsRepository } from '../../repository/prisma/prisma-pets-repository'
import { ListPetsByCharacteristicsUseCase } from '../list-pets-by-characteristics'

export function makeListPetsByCharacteristicsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const listPetsByCharacteristics = new ListPetsByCharacteristicsUseCase(
    prismaPetsRepository,
  )

  return listPetsByCharacteristics
}
