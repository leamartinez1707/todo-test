/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';



describe('Test of authentication (e2e)', () => {
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

    it('Should register ', async () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send({
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            })
            .then((res) => {

                expect(res.statusCode).toEqual(201)
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body).toHaveProperty('id');
            })

    })
    it('Should log in with credentials and create a token ', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'leandro@gmail.com',
                password: '123456789'
            })
            .then((res) => {
                expect(res.statusCode).toEqual(201)
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body.token).toBeDefined()
            })
    })

});