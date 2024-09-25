import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that are not included in the DTO
      forbidNonWhitelisted: true, // Throws error if any extra properties are included
      transform: true, // Automatically transforms payloads to be objects typed according to their DTO classes
    }),
  );
  await app.listen(80);
}
bootstrap();
