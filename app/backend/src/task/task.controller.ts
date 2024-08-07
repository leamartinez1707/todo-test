/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Body, Param, NotFoundException, BadRequestException, Put, UseGuards, Request } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";
import { AuthGuard } from "../auth/guard/auth.guard";


@Controller('tasks')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }
    @Get()
    @UseGuards(AuthGuard)
    async getTasks(
        @Request() req,
    ) {
        try {
            await this.taskService.deleteExpiratedTasks()
            return await this.taskService.getAllTasks(req.user.id)
        } catch (error) {
            throw new BadRequestException('Error al buscar las tareas')
        }
    }
    @Get(':id')
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    async createTask(
        @Body() data: Task,
        @Request() req,
    ) {
        try {
            if (!req.user.id) throw new BadRequestException('No hay ningun usuario logueado')
            data.userId = req.user.id
            const createdTask = await this.taskService.createTask(data)
            return createdTask
        } catch (error) {
            throw new BadRequestException('La tarea no se pudo crear')
        }
    }
    @Put(':id')
    @UseGuards(AuthGuard)
    async updateTask(@Param('id') id: string, @Body() data: Task,
        @Request() req) {
        try {
            const taskFound = await this.taskService.getTaskById(Number(id))
            if (taskFound.userId !== req.user.id) throw new BadRequestException('No puedes actualizar una tarea que no te pertenece')
            const updatedTask = await this.taskService.updateTask(Number(id), data)
            return updatedTask
        } catch (error) {
            throw new BadRequestException('La tarea no se pudo actualizar')
        }
    }
    @Put('updateState/:id')
    @UseGuards(AuthGuard)
    async updateState(
        @Request() req,
        @Param('id') id: string) {
        try {
            const taskFound = await this.taskService.getTaskById(Number(id))
            if (taskFound.userId !== req.user.id) throw new BadRequestException('No puedes actualizar una tarea que no te pertenece')
            const updatedTask = await this.taskService.updateState(Number(id))
            return updatedTask
        } catch (error) {
            throw new BadRequestException('La tarea no se pudo actualizar')
        }
    }


    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteTask(@Param('id') id: string,
        @Request() req
    ) {
        try {
            const taskFound = await this.taskService.getTaskById(Number(id))
            if (taskFound.userId !== req.user.id) throw new BadRequestException('No puedes actualizar una tarea que no te pertenece')
            return await this.taskService.deleteTask(Number(id))
        } catch (error) {
            throw new NotFoundException('La tarea no se encontró')
        }

    }
}