import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const tasksConfig = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('The API description for the Tasks module')
    .setVersion('1.0')
    .addTag('Tasks')
    .build();

  const userConfig = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('The API description for the User module')
    .setVersion('1.0')
    .addTag('User')
    .build();

  const tasksDocument = SwaggerModule.createDocument(app, tasksConfig, {
    include: [TasksModule],
  });
  SwaggerModule.setup('api/tasks', app, tasksDocument);

  const userDocument = SwaggerModule.createDocument(app, userConfig, {
    include: [UserModule],
  });
  SwaggerModule.setup('api/user', app, userDocument);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
