import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { listPetsByCity } from './list-by-city'
import { listPetById } from './list-by-id'
import { searchByCharacteristics } from './search-characteristics'
import { refresh } from './refresh'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/listAll', listPetsByCity)
  app.get('/pets/list/:petId', listPetById)
  app.get('/pets/search', searchByCharacteristics)
  app.patch('/token/refresh', refresh)
  app.post('/pets/create', { onRequest: [verifyJWT] }, register)
}
