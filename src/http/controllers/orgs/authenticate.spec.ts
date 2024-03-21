import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      address: 'Avenida Nilo Peçanha',
      cep: '25010189',
      email: 'trslucas@outlook.com',
      password: 'Senha@2134',
      responsable_name: 'Lucas Trindade',
      whatsapp: '21965667088',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'trslucas@outlook.com',
      password: 'Senha@2134',
    })

    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
