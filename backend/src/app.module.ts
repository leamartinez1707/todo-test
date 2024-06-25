import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TaskModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
