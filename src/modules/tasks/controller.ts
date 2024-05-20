import { Body, Controller, Delete, Get, HttpStatus, Inject, NotFoundException, Param, Patch, Post, Put, Query, Req, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { TaskService, TaskServiceImpl } from "./services";
import { TaskEntity } from "./tasks.type";
import { LoggedInUserType } from "../auth/auth.type";
import { FilterTaskDto, IdParamDto, TaskDto, UpdateTaskDto } from "./dtos/tasks.dto";
import { LoggedInUser } from "../auth/decorators/loggin-user.decorator";
import { Response } from "express";
import { EventsGateway } from "../events/events.gateway";


@Controller('tasks')
@ApiTags('Task')
export class Taskcontroller {

  constructor(
  @Inject(TaskServiceImpl)  private readonly taskService: TaskService,
  @Inject(EventsGateway) private readonly eventsGateway: EventsGateway
    ) {}



  @ApiBearerAuth()
  @ApiBody({type: TaskDto, description: 'Task data', schema: {
    example: {
      title: 'Task 1',
      description: 'Task 1 description'
    }
  }})
  @ApiCreatedResponse({type: TaskDto, description: 'Task created successfully', schema: {
    example: {
      message: 'Task created successfully',
      status: 'success',
      data: {
        id: '1',
        title: 'Task 1',
        description: 'Task 1 description',
        status: false,
        user_id: '1'
      }
    }
  }})
  @Post()
  async create(@Body() args: TaskDto, @LoggedInUser() user: LoggedInUserType, @Res() res: Response) {
    args.userId = user.id;
    const task = await this.taskService.create(args);
    if (task instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: task.message,
        status: 'error',
        data: null
      })
    }

    this.eventsGateway.server.emit('events', task)
    return res.status(HttpStatus.OK).json({
      message: 'Task created successfully',
      status: 'success',
      data: task
    })
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({type: TaskEntity, description: 'Task toggled successfully', schema: {
    example: {
      message: 'Task toggled successfully',
      status: 'success',
      data: null
    }
  }})
  @ApiParam({name: 'id', type: String})
  @Post('/toggle/:id')
  async toggleTask(@Param() param: IdParamDto, @Res() res: Response) {
    const task = await this.taskService.toggleTask(param.id);
    if (task instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: task.message,
        status: 'error',
        data: null 
      })
    }

    this.eventsGateway.server.emit('events', 'toggled')
    return res.status(HttpStatus.OK).json({
      message: 'Task toggled successfully',
      status: 'success',
      data: null
    })
  }

  @ApiBearerAuth()
  @ApiBody({type: TaskDto, schema: {
    example: {
      title: 'Task 1',
      description: 'Task 1 description',
      userId: '1'
    }
  }})
  @ApiParam({name: 'id', type: String})
  @ApiOkResponse({type: UpdateTaskDto, schema: {
    example: {
      message: 'Task updated successfully',
      status: 'success',
      data: {
        id: '1',
        title: 'Task 1',
        description: 'Task 1 description',
        userId: '1'
      }
    }
  }})
  @Patch(':id')
  async update(@Body() args: UpdateTaskDto, @Param() param: IdParamDto,  @Res() res: Response) {
    args.id = param.id;
    const task = await this.taskService.update(args);
    if (task instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: task.message,
        status: 'error',
        data: null 
      })
    }

    this.eventsGateway.server.emit('events', task)
    return res.status(HttpStatus.OK).json({
      message: 'Task updated successfully',
      status: 'success',
      data: task
    })
  }

  @ApiBearerAuth()
  @ApiOkResponse({type: TaskEntity, description: 'Task fetched successfully', schema: {
    example: {
      message: 'Task fetched successfully',
      status: 'success',
      data: {
        id: '1',
        title: 'Task 1',
        description: 'Task 1 description',
        status: false,
        user_id: '1'
      } 
    }
  }})
  @ApiParam({name: 'id', type: String})
  @Get(':id')
  async getTask(@Param() param: IdParamDto, @Res() res: Response) {
    const task = await this.taskService.getTask(param.id);
    if (task instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: task.message,
        status: 'error',
        data: null 
      })
    }
    this.eventsGateway.server.emit('events', task)
    return res.status(HttpStatus.OK).json({
      message: 'Task fetched successfully',
      status: 'success',
      data: task
    })
  }

  @ApiBearerAuth()
  @ApiOkResponse({type: TaskEntity, isArray: true, description: 'Tasks fetched successfully', schema: {
    example: {
      message: 'Tasks fetched successfully',
      status: 'success',
      data: {
        paginate: {
          total: 1,
          page: 1,
          limit: 5
        },
        tasks: [{
          id: '1',
          title: 'Task 1',
          description: 'Task 1 description',
          status: false,
          userId: '1'
        }]
      }
    }        
  }})
  @ApiQuery({name: 'status', type: Boolean, required: false, allowEmptyValue: true, })
  @ApiQuery({name: 'limit', type: Number, required: false})
  @ApiQuery({name: 'page', type: Number, required: false})
  @ApiQuery({name: 'startDate', type: String, required: false})
  @ApiQuery({name: 'endDate', type: String, required: false})
  @Get()
  async getTasks(@Query() arg: FilterTaskDto, @Res() res: Response, @LoggedInUser() user: LoggedInUserType) {
    arg.userId = user.id
    const [tasks, paginate] = await this.taskService.getTasks(arg);

    this.eventsGateway.server.emit('events', tasks)
    return res.status(HttpStatus.OK).json({
      message: 'Tasks fetched successfully',
      status: 'success',
      data: {
        tasks,
        paginate
      }
    })
  }

  @ApiBearerAuth()
  @ApiParam({name: 'id', type: String})
  @Delete(':id')
  async delete(@Param() param: IdParamDto, @Res() res: Response) {
    const task = await this.taskService.delete(param.id);
    if (task instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: task.message,
        status: 'error',
        data: null 
      })
    }
    this.eventsGateway.server.emit('events', 'deleted')
    return res.status(HttpStatus.OK).json({
      message: 'Task deleted successfully',
      status: 'success',
      data: null
    })
  }
}