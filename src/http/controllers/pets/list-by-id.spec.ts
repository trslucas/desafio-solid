import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('List Pet By Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to list a pet by id', async () => {
    await request(app.server).post('/orgs').send({
      address: 'Avenida Nilo Peçanha',
      cep: '25010189',
      email: 'trslucas@outlook.com',
      password: 'Senha@2134',
      responsable_name: 'Lucas Trindade',
      whatsapp: '21965667088',
    })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({ email: 'trslucas@outlook.com', password: 'Senha@2134' })

    const response = await request(app.server)
      .post('/pets/create')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Nina Colina',
        age: 1,
        city: 'Rio de Janeiro',
        description: 'Linda do pai',
        energyLevel: 1,
        environment: 1,
        requisits: [],
        independencyLevel: 1,
        org_id: '1001',
        size: 1,
      })

    const getPetResponse = await request(app.server).get(
      `/pets/list/${response.body.pet.id}`,
    )

    expect(getPetResponse.status).toBe(200)
  })
})
