import { MongoClient, Collection } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'

export const MongoHelper = {
  client: MongoClient,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL as string)
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (data, result: any): AccountModel {
    const { insertedId: _id } = result
    return Object.assign({}, data, { id: _id.toString() })
  }
}
