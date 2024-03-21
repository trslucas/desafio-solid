import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to register Org', async () => {
    const response = await request(app.server).post('/orgs').send({
      address: 'Avenida Nilo Peçanha',
      cep: '25010189',
      email: 'trslucas@outlook.com',
      password: 'Senha@2134',
      responsable_name: 'Lucas Trindade',
      whatsapp: '21965667088',
    })

    expect(response.statusCode).toEqual(200)
  })
})
