import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeListAPetUseCase } from '../../../use-cases/factories/make-list-a-pet-use-case'

export async function listPetById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getSchema = z.object({
    petId: z.string(),
  })
  const { petId } = getSchema.parse(request.params)

  const listPetsByCityUseCase = makeListAPetUseCase()
  try {
    const { pet } = await listPetsByCityUseCase.execute({ petId })

    return reply.status(200).send({ pet })
  } catch (err) {
    console.log(err)
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
