import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterOrgUseCase } from '../../../use-cases/factories/make-register-org-use-case'
import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    responsable_name: z.string(),
    email: z.string().email(),
    cep: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
  })

  const { responsable_name, email, cep, address, whatsapp, password } =
    registerBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      responsable_name,
      email,
      cep,
      address,
      whatsapp,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
  return reply.status(200).send()
}
