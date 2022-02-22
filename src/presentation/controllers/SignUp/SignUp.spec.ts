import { SignUpController } from './SignUp'
import { MissingParamError } from '../../errors/missing-params-error'

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
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'guineapig',
        password: 'wheekwheek',
        passwordConfirmation: 'wheekwheek'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
