/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Body, Param, NotFoundException, BadRequestException, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";


@Controller('api/tasks')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }
    @Get()
    async getTasks() {
        try {
            return await this.taskService.getAllTasks()

        } catch (error) {
            throw new BadRequestException('Error al buscar las tareas')
        }
    }
    @Get(':id')
    async getById(@Param('id') id: string) {
        try {
            const taskFound = await this.taskService.getTaskById(Number(id))
            // Si el objeto devuelto es null, lanzamos un error
            if (!taskFound) throw new NotFoundException('La tarea no se encontró')
            // Sino retornamos el objeto encontrado
            return taskFound
        } catch (error) {
            throw new NotFoundException('Error al buscar la tarea')

        }

    }
    @Post()
    async createTask(
        @Body('userId') userId: number,
        @Body() data: Task
    ) {
        try {
            const createdTask = await this.taskService.createTask(userId, data)
            return createdTask
        } catch (error) {
            throw new BadRequestException('La tarea no se pudo crear')
        }
    }
    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() data: Task) {
        try {
            const updatedTask = await this.taskService.updateTask(Number(id), data)
            return updatedTask
        } catch (error) {
            throw new BadRequestException('La tarea no se pudo actualizar')
        }
    }
    @Delete(':id')
    async deleteTask(@Param('id') id: string) {
        try {
            return await this.taskService.deleteTask(Number(id))
        } catch (error) {
            throw new NotFoundException('La tarea no se encontró')
        }

    }
}