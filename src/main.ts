import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  // Added Swagger here

  const config = new DocumentBuilder()
    .setTitle('Ai Advance Todo App')
    .setDescription('This is Dummy Description  ')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: '/api/json',
  });
  // Ended Swagger here
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
