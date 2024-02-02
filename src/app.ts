import { ZodError } from "zod"
import { env } from "./env"
import fastify from "fastify"

export const app = fastify()


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