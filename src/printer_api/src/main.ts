import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 6666;
  console.log(`Server running on port ${PORT}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}

export { bootstrap };
