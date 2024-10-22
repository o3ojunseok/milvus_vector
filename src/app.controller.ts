import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    @InjectDataSource()
    private defaultDataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("health")
  @HealthCheck()
  check() {
      return this.health.check([
          () => this.db.pingCheck("database", { connection: this.defaultDataSource }),
          () => this.memory.checkHeap("memory heap", 300 * 1024 * 1024),
          () => this.memory.checkRSS("memory RSS", 300 * 1024 * 1024),
      ])
  }
}
