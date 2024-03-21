import { env } from './env'
import fastify from 'fastify'
import { petsRoutes } from './http/controllers/pets/routes'
import { orgsRoutes } from './http/controllers/orgs/routes'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)

app.register(petsRoutes)
app.register(orgsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    console.error('Erro de validação Zod:', error)
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error('Erro interno do servidor:', error)
  }
  reply.status(500).send({ message: 'Internal Server Error' })
})
