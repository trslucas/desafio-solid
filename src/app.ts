import { ZodError } from 'zod'
import { env } from './env'
import fastify from 'fastify'
import { petsRoutes } from './http/controllers/pets/routes'
import { orgsRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

app.register(petsRoutes)
app.register(orgsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  reply.status(500).send({ message: 'Internal Server Error' })
})
