import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { MongoService } from "./mongo.service";
import { CreateMongoDto } from "./dto/create-mongo.dto";
import { UpdateMongoDto } from "./dto/update-mongo.dto";

@Controller("mongo")
export class MongoController {
  constructor(private readonly mongoService: MongoService) {}
}
