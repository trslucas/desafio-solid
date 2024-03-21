import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
      responsable_name: 'Lucas',
      email: 'lucas@thummi.global',
      cep: '20510290',
      address: 'Rua Souza Cruz, 162',
      whatsapp: '21965667088',
      password: 'Senha@2134',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'lucas@thummi.global',
      password: 'Senha@2134',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
