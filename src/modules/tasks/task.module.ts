import { Module } from "@nestjs/common";
import { TaskRepositoryImpl } from "./repositories";
import { TaskServiceImpl } from "./services";
import { DALImpl } from "../common/internal/postgres/dal";
import { Taskcontroller } from "./controller";
import { EventsModule } from "../events/events.module";
import { EventsGateway } from "../events/events.gateway";



@Module({
  imports: [],
  controllers: [
    Taskcontroller
  ],
  providers: [
    DALImpl,
    TaskRepositoryImpl,
    TaskServiceImpl,
    EventsGateway,
  ],
  exports: [],
})

export class TaskModule {}