/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"
import { Task } from "@prisma/client";

@Injectable()
export class TaskService {

    constructor(private prisma: PrismaService) { }

    async createTask(data: Task): Promise<Task> {

        // Seteamos la fecha de expiración de la tarea a 24 horas
        const expiratedAt = new Date();
        expiratedAt.setHours(expiratedAt.getHours() + 24);

        return this.prisma.task.create({
            data: {
                ...data,
                state: data.state.toLowerCase(),
                expirateDate: expiratedAt,
            }
        });
    }
    async getAllTasks(id: number): Promise<Task[]> {
        const tasks = this.prisma.task.findMany({
            where: {
                userId: id,
            }
        });
        return tasks;
    }
    async getTaskById(id: number): Promise<Task> {
        return this.prisma.task.findUnique({
            where: {
                id
            }
        });
    }
    async updateTask(id: number, data: Task): Promise<Task> {
        return this.prisma.task.update({
            where: {
                id
            },
            data
        });
    }
    async updateState(id: number): Promise<Task> {
        const task = await this.prisma.task.findUnique({
            where: {
                id
            }
        });
        return this.prisma.task.update({
            where: {
                id
            },
            data: {
                state: task.state === 'pendiente' ? 'completada' : 'pendiente'
            }
        });
    }
    async deleteTask(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: {
                id
            }
        });
    }

    async deleteExpiratedTasks(): Promise<void> {
        const hoy = new Date();
        // Borrar las tareas que tengan una fecha de expiración menor a la fecha actual
        await this.prisma.task.deleteMany({
            where: {
                expirateDate: {
                    lt: hoy
                }
            }
        });
    }


}