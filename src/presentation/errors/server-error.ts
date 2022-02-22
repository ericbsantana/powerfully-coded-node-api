export class ServerError extends Error {
  constructor () {
    super('Internal server error. Please try again later.')
    this.name = 'ServerError'
  }
}
