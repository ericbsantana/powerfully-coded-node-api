import { SignUpController } from './SignUp'

describe('Signup controller', () => {
  test('Should return 400 if no username is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'guinea_pig@pigs.com',
        password: 'wheekwheek',
        passwordConfirmation: 'wheekwheek'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})
