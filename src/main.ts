import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      logger: ["error", "log", "debug"],
    }
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,POST,PUT,DELETE',
    credentials: true,
  });
  
  const config = new DocumentBuilder()
    .setTitle("Milvus")
    .setDescription("Milvus API")
    .setVersion("1.0")
    .addTag("Milvus")
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
