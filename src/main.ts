import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const globalPrefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Securitize API')
    .setDescription('API for securitize ethereum app')
    .setVersion('1.0')
    .setBasePath(globalPrefix)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
