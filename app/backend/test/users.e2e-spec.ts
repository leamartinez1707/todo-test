/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';



describe('Users (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });
    afterAll(async () => {
        app.close();
    });

    it('Should get all the users', async () => {
       

        return request(app.getHttpServer())
            .get('/users')
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toBeInstanceOf(Array)
            })
    });

    // Con datos correctos
    it('Should create a User', async () => {
        return request(app.getHttpServer())
            .post('/users')
            .send({
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: 'testing'
            })
            .then((res) => {
                expect(res.statusCode).toEqual(201)
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body).toHaveProperty('id');
            })
    })
    // Con datos incorrectos
    it('Should not create a User', async () => {
        const user = {
            name: faker.person.firstName(),
            email: 'leandro@hotmail.com',
        }
        return request(app.getHttpServer())
            .post('/users')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toEqual(400)
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body).toHaveProperty('message');
            })
    })
    // Con datos correctos
    it('Should get a User by Id', async () => {
        return request(app.getHttpServer())
            .get('/users/2')
            .expect(200)
            .expect({ id: 2, name: 'Nahuel', email: 'testing2@gmail.com' })
    })
    // Con datos incorrectos
    it('Should not get the User', async () => {
        return request(app.getHttpServer())
            .get('/users/1000')
            .then((res) => {
                expect(res.statusCode).toEqual(404)
            }
            )
    })
    // Con datos correctos
    it('Should update a User by Id', async () => {
        const data = {
            id: 1,
            name: faker.person.firstName(),
            email: faker.internet.email(),
        }
        return request(app.getHttpServer())
            .patch('/users/1')
            .send(data)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body).toBeInstanceOf(Object)
                expect(data)
            })
    })
    // Con datos incorrectos
    it('Should not update the user', async () => {
        const data = {
            id: 4,
            name: faker.person.firstName(),
            email: faker.internet.email(),
        }
        return request(app.getHttpServer())
            .patch('/users/1')
            .send(data)
            .then((res) => {
                expect(res.statusCode).toEqual(400)
                expect(res.body).toHaveProperty('message')
            })
    })

    // it('Should delete a User by Id', async () => {
    //     return request(app.getHttpServer())
    //         .delete('/users/5')
    //         .expect(200)
    // })
});