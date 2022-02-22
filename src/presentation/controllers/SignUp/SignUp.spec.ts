import { SignUpController } from './SignUp'
import { MissingParamError } from '../../errors/missing-params-error'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { EmailValidator } from '../../protocols/email-validator'
import { ServerError } from '../../errors/server-error'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('Signup controller', () => {
  test('Should return 400 if no username is provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'guineapig',
        email: 'guinea_pig@pigs.com',
        passwordConfirmation: 'wheekwheek'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no password confirmation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'guineapig',
        email: 'guinea_pig@pigs.com',
        password: 'wheekwheek'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'guineapig',
        email: 'guinea_pig@pigs.com',
        password: 'wheekwheek',
        passwordConfirmation: 'wheekwheek'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'guineapig',
        email: 'guinea_pig@pigs.com',
        password: 'wheekwheek',
        passwordConfirmation: 'wheekwheek'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('guinea_pig@pigs.com')
  })

  test('Should return 500 if EmailValidator throws an error', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }

    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)

    const httpRequest = {
      body: {
        name: 'guineapig',
        email: 'guinea_pig@pigs.com',
        password: 'wheekwheek',
        passwordConfirmation: 'wheekwheek'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
