import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './entity/task.entity';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_task_manager',
      entities: [Task],
      synchronize: true,
    }), TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
