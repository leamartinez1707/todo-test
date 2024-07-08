/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';
import { Task } from '@prisma/client';



describe('Testing of Tasks (e2e)', () => {
    let app: INestApplication;
    let token: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // Ya que las rutas están protegidas, necesitamos un token para acceder a ellas
        // Para obtener el token, primero debemos registrarnos y logearnos
        const { body } = await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: 'testing'
            }).expect(201);
        // Luego, con los datos del usuario registrado, nos logeamos
        const loginRes = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: body.email,
                password: 'testing'
            }).expect(201);
        // Se guarda el token en una variable
        token = loginRes.body.token;
        // Este token es el que va a ser utilizado en cada peticion, con los datos del usuario logueado
        // Todas las tareas creadas, van a tener el userId del usuario logueado
    });
    afterAll(async () => {
        app.close();
        token = null
    });


    it('Should get all the tasks', async () => {

        return request(app.getHttpServer())
            .get('/tasks')
            // Se envía el token en el header de la petición
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toBeInstanceOf(Array)
                expect(res.body.length).toBeGreaterThanOrEqual(0)
            })
    });
    it('Should get a task by ID', async () => {
        // Primero creamos una tarea para luego pasarle el id a la petición
        const task = {
            title: faker.lorem.words(),
            description: faker.lorem.sentence(
            ),
            state: 'pendiente'
        }
        // Enviamos la peticion con la tarea creada
        const { body } = await request(app.getHttpServer())
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(task)
            .expect(201);
        // Buscamos la tarea con el id que nos devolvió la creación anterior
        return request(app.getHttpServer())
            .get(`/tasks/${body.id}`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('title')
                expect(res.body).toHaveProperty('description')
                expect(res.body).toHaveProperty('state')
                expect(res.body).toHaveProperty('expirateDate')
                expect(res.body).toHaveProperty('userId')
            })
    });
    it('Should create a task', async () => {
        // Creamos la tarea con datos aleatorios
        const task = {
            title: faker.lorem.words(),
            description: faker.lorem.sentence(
            ),
            state: 'pendiente'
        }
        return request(app.getHttpServer())
            .post('/tasks')
            .send(task)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(201)
                expect(res.body).toHaveProperty('id')
                expect(res.body).toMatchObject(task)
            })
    });
    it('Should update a task', async () => {
        // Creamos una tarea para luego actualizarla
        const task = {
            title: faker.lorem.words(),
            description: faker.lorem.sentence(
            ),
            state: 'pendiente'
        }
        const response: Task = await request(app.getHttpServer())
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(task)
            .then((res) => {
                return res.body
            })
        // Creamos una tarea con los datos actualizados
        const editedTask = {
            title: `${response.title} updated`,
            description: `${response.description} updated`,
            state: 'completada'
        }
        return request(app.getHttpServer())
            .put(`/tasks/${response.id}`)
            // Se envía el token en el header de la petición
            .set('Authorization', `Bearer ${token}`)
            .send(editedTask)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toHaveProperty('id')
                expect(res.body).toMatchObject(editedTask)
            })
    });

    it('Should update a task state', async () => {
        // Creamos una tarea para luego actualizar su estado
        const task = {
            title: faker.lorem.words(),
            description: faker.lorem.sentence(
            ),
            state: 'pendiente'
        }
        const response: Task = await request(app.getHttpServer())
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(task)
            .then((res) => {
                return res.body
            })
        return request(app.getHttpServer())
            .put(`/tasks/updateState/${response.id}`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toHaveProperty('id')
                expect(res.body.state).toBe(response.state.toLowerCase() === 'pendiente' ? 'completada' : 'pendiente')
                expect(res.body.title).toBe(response.title)
                expect(res.body.description).toBe(response.description)
            })
    });

    it('Should delete a task', async () => {
        const task = {
            title: faker.lorem.words(),
            description: faker.lorem.sentence(
            ),
            state: 'pendiente'
        }
        // Primero creamos una tarea para luego eliminarla
        const response: Task = await request(app.getHttpServer())
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(task)
            .then((res) => {
                return res.body
            })
        return request(app.getHttpServer())
            .delete(`/tasks/${response.id}`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toMatchObject(response)
            })
    });
})