/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';



describe('UsersController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Should get all the users', async () => {
        // // Ya que la ruta está protegida, necesitamos un token para acceder a ella
        // // Para obtener el token, primero debemos loguearnos
        // const loginRes = await request(app.getHttpServer())
        //     .post('/auth/login')
        //     .send({
        //         email: 'leandro@gmail.com',
        //         password: '123456789'
        //     });
        // // Se guarda el token en una variable
        // const cookies = loginRes.body.token

        return request(app.getHttpServer())
            .get('/users')
            // Se envía el token en el header de la petición
            // .set('Authorization', `Bearer ${cookies}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toBeInstanceOf(Array)
            })
    });

    it('Should create a User', async () => {
        return request(app.getHttpServer())
            .post('/users')
            .send({
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            })
            .then((res) => {
                expect(res.statusCode).toEqual(201)
                expect(res.body).toBeInstanceOf(Object)
            })
    })
    it('Should get a User by Id', async () => {
        return request(app.getHttpServer())
            .get('/users/2')
            .expect(200)
            .expect({ id: 2, name: 'Nahuel', email: 'testing2@gmail.com' })
    })
    it('Should update a User by Id', async () => {
        const data = {
            id: 1,
            name: faker.person.firstName(),
            email: faker.internet.email(),
        }
        return request(app.getHttpServer())
            .patch('/users/1')
            .send(data)
            .expect(200)
            .expect(data)
    })
    // it('Should delete a User by Id', async () => {
    //     return request(app.getHttpServer())
    //         .delete('/users/5')
    //         .expect(200)
    // })
    afterAll(async () => {
        app.close();
    });
});