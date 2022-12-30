import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// WebSocket
import { IoAdapter } from '@nestjs/platform-socket.io';
// Dotenv
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(5174);
}
bootstrap();
