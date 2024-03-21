import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '../../../use-cases/factories/make-register-pet-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    age: z.number(),
    city: z.string(),
    description: z.string(),
    energyLevel: z.number(),
    environment: z.number(),
    independencyLevel: z.number(),
    name: z.string(),
    requisits: z.array(z.string()),
    size: z.number(),
  })

  const registerPetUseCase = makeRegisterPetUseCase()

  const {
    age,
    city,
    description,
    energyLevel,
    environment,
    independencyLevel,
    name,
    requisits,
    size,
  } = registerPetBodySchema.parse(request.body)

  const userId = request.user.sub

  try {
    const { pet } = await registerPetUseCase.execute({
      age,
      city,
      description,
      energyLevel,
      environment,
      independencyLevel,
      orgId: userId,
      name,
      requisits,
      size,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
