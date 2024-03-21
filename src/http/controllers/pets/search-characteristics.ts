import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeListPetsByCharacteristicsUseCase } from '../../../use-cases/factories/make-list-pets-by-characteristics'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function searchByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchByCharacteristicsSchema = z.object({
    city: z.string(),
    characteristics: z
      .object({
        age: z.number().optional(),
        energy_level: z.number().optional(),
        environment: z.number().optional(),
        size: z.number().optional(),
      })
      .optional(),
  })

  const { city, characteristics } = searchByCharacteristicsSchema.parse(
    request.query,
  )

  const searchByCharacteristicsUseCase = makeListPetsByCharacteristicsUseCase()

  try {
    const { pets } = await searchByCharacteristicsUseCase.execute({
      city,
      ...characteristics,
    })

    return { pets }
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
