/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path';

@Module({
  imports: [TaskModule, UsersModule, AuthModule,
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    })
  ],
  controllers: [],
  providers: [], 
})
export class AppModule { }
