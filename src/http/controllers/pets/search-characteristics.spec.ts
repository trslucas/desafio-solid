import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('List Pet By Characteristics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to list a pet by characteristics', async () => {
    const orgResponse = await request(app.server).post('/orgs').send({
      address: 'Avenida Nilo Peçanha',
      cep: '25010189',
      email: 'trslucas@outlook.com',
      password: 'Senha@2134',
      responsable_name: 'Lucas Trindade',
      whatsapp: '21965667088',
    })

    expect(orgResponse.statusCode).toEqual(200)

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({ email: 'trslucas@outlook.com', password: 'Senha@2134' })

    expect(authResponse.body.token).toEqual(expect.any(String))
    const pets = [
      {
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
      },
      {
        name: 'Mayara Malalão',
        age: 1,
        city: 'Rio de Janeiro',
        description: 'Linda da mãe',
        energyLevel: 1,
        environment: 1,
        requisits: [],
        independencyLevel: 1,
        org_id: '1001',
        size: 1,
      },
      {
        name: 'Josiane Sujiane',
        age: 1,
        city: 'São Paulo',
        description: 'Linda da mãe',
        energyLevel: 1,
        environment: 1,
        requisits: [],
        independencyLevel: 1,
        org_id: '1001',
        size: 1,
      },
    ]

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post('/pets/create')
          .set('Authorization', `Bearer ${authResponse.body.token}`)
          .send(pet),
      ),
    )

    const city = 'Rio de Janeiro'
    const characteristics = {
      energy_level: 1,
    }
    const response = await request(app.server).get('/pets/search').query({
      city,
      characteristics,
    })

    expect(response.body.pets).toHaveLength(2)

    expect(response.status).toBe(200)
  })
})
