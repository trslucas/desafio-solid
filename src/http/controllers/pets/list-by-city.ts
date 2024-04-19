import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeListPetsUseCase } from '../../../use-cases/factories/make-list-pets-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function listPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    city: z.string().min(1),
  })
  const { city } = registerPetBodySchema.parse(request.query)

  const listPetsByCityUseCase = makeListPetsUseCase()
  try {
    const { pets } = await listPetsByCityUseCase.execute({ city })

    return reply.status(200).send({ pets })
  } catch (err) {
    console.log(err)
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
