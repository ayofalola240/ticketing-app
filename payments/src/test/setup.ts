import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}
jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51HIBTYJbl3aKKYYIwe6wafXCFX5RZ5132pwCzIeUxxGP1ZZzCTYwmC4G68DwvLHevZJoPMlyId7nWoPrA5llSkAI00HU3nO4jr';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

export const signin = (id?: string): [string] => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'text@example.com',
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build a session object: { jwt: MY_JWT }
  const session = { jwt: token };

  // Convert the session to JSON
  const sessionJSON = JSON.stringify(session);

  // Encode JSON as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return a string representing the cookie with the encoded data
  return [`session=${base64}`];
};
