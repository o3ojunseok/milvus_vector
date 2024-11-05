import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MilvusModule } from "./milvus/milvus.module";
import { OpenAiModule } from "./open-ai/open-ai.module";
import { ContentModule } from "./content/content.module";
import { ChatModule } from "./chat/chat.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoModule } from "./mongo/mongo.module";
import { LoggerMiddleware } from "./logger.middleware";
import { ScrapingModule } from './scraping/scraping.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ["dist/**/*.entity.{ts,js}"],
      synchronize: true,
      timezone: "Z",
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      dbName: process.env.MONGO_DATABASE_NAME,
    }),
    MilvusModule,
    OpenAiModule,
    ContentModule,
    ChatModule,
    MongoModule,
    ScrapingModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: "/", method: RequestMethod.GET},
      )
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}