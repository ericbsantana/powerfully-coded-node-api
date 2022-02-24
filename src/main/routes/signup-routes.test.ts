import request from 'supertest'
import app from '../config/app'

describe('Signup routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'guinea pig',
        email: 'guinea@pig.com',
        password: 'wheekwheek',
        passwordConfirmation: 'wheekwheek'
      })
      .expect(200)
  })
})
