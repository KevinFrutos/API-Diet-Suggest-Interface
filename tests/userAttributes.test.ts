import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
let token: string;

jest.mock('../src/infrastructure/cache/RedisCacheService', () => {
    return {
        RedisCacheService: jest.fn().mockImplementation(() => ({
            set: jest.fn(),
            get: jest.fn().mockResolvedValue(null),
            delete: jest.fn()
        }))
    };
});

jest.mock('../src/infrastructure/logging/sentry', () => {
    return {
        __esModule: true,
        default: {
            init: jest.fn(),
            captureException: jest.fn(),
            captureMessage: jest.fn(),
            setUser: jest.fn(),
            Handlers: {
                requestHandler: jest.fn(() => (req: any, res: any, next: any) => next()),
                tracingHandler: jest.fn(() => (req: any, res: any, next: any) => next()),
                errorHandler: jest.fn(() => (err: any, req: any, res: any, next: any) => next(err)),
            },
            setupExpressErrorHandler: jest.fn(),
            setupExpressErrorErrorHandler: jest.fn(),
        },
    };
});


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    await request(app).post('/api/v1/auth/register').send({
        email: 'note@example.com',
        password: 'password123',
    });

    const res = await request(app).post('/api/v1/auth/login').send({
        email: 'note@example.com',
        password: 'password123',
    });

    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('UserAttributes Routes', () => {
    it('should create new userAttributes', async () => {
        const res = await request(app)
            .post('/api/v1/user/attributes/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "age": 18,
                "gender": "male",
                "weight": 57,
                "weightUnit": "kg",
                "height": 167,
                "heightUnit": "cm",
                "goals": "",
                "allergies": []
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.userAttributes).toMatchObject({
            "age": 18,
            "gender": "male",
            "weight": 57,
            "weightUnit": "kg",
            "height": 167,
            "heightUnit": "cm",
            "goals": "",
            "allergies": []
        });
    });

    it('should update userAttributes', async () => {
        const res = await request(app)
            .put('/api/v1/user/attributes/update')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "age": 30,
                "gender": "male",
                "weight": 57,
                "weightUnit": "kg",
                "height": 167,
                "heightUnit": "cm",
                "goals": "Gain some muscle",
                "allergies": ["lactose"]
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.userAttributes).toMatchObject({
            "age": 30,
            "gender": "male",
            "weight": 57,
            "weightUnit": "kg",
            "height": 167,
            "heightUnit": "cm",
            "goals": "Gain some muscle",
            "allergies": ["lactose"]
        });
    });

    it('should get userAttributes', async () => {
        const res = await request(app)
            .get('/api/v1/user/attributes/get')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(res.statusCode).toBe(200);
        expect(res.body.userAttributes).toMatchObject({
            "age": 30,
            "gender": "male",
            "weight": 57,
            "weightUnit": "kg",
            "height": 167,
            "heightUnit": "cm",
            "goals": "Gain some muscle",
            "allergies": ["lactose"]
        });
    });
});
