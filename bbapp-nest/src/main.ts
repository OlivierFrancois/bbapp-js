import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    // Swagger
    const config = new DocumentBuilder().setTitle('Bbapp API').setDescription(`Documentation de l'API de Bbapp`).setVersion('0.1').build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(8090);
}

bootstrap();
