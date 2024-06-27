/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Task } from "@prisma/client";

@Injectable()
export class TaskService {

    constructor(private prisma: PrismaService) { }

    async createTask(data: Task): Promise<Task> {

        // Seteamos la fecha de expiración de la tarea
        const expiratedAt = new Date();
        expiratedAt.setHours(expiratedAt.getHours() + 24);

        return this.prisma.task.create({
            data: {
                ...data,
                expirateDate: expiratedAt,
            }
        });
    }
    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
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
    async deleteTask(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: {
                id
            }
        });
    }


}