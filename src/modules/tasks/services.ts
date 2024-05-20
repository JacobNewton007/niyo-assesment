import { Inject, NotFoundException } from "@nestjs/common";
import { PaginatorArgs } from "../common/helper/paginate";
import { TaskArgs, TaskEntity, FilterTaskArg } from "./tasks.type";
import taskRepository, { TaskRepository, TaskRepositoryImpl } from "./repositories";



export interface TaskService {

  create(arg: TaskArgs): Promise<TaskEntity | NotFoundException>;
  update(arg: Partial<TaskArgs>): Promise<TaskEntity | NotFoundException>;
  delete(id: string): Promise<void | NotFoundException>;
  getTasks(arg: FilterTaskArg): Promise<[TaskEntity[], PaginatorArgs]>;
  getTask(id: string): Promise<TaskEntity | NotFoundException>;
  toggleTask(id: string): Promise<void | NotFoundException>;
}



export class TaskServiceImpl implements TaskService {

  constructor(
    @Inject(TaskRepositoryImpl) private readonly taskRepository: TaskRepository
  ) {}



  public async create(arg: TaskArgs): Promise<TaskEntity | NotFoundException> {
    return this.taskRepository.create(arg);
  }


  public async update(arg: Partial<TaskArgs>): Promise<TaskEntity | NotFoundException> {
    return this.taskRepository.update(arg);
  }


  public async delete(id: string): Promise<void | NotFoundException> {
    return this.taskRepository.delete(id);
  }


  public async getTasks(arg: FilterTaskArg): Promise<[TaskEntity[], PaginatorArgs]> {
    return this.taskRepository.getTasks(arg);
  }


  public async getTask(id: string): Promise<TaskEntity | NotFoundException> {
    return this.taskRepository.getTask(id);
  }


  public async toggleTask(id: string): Promise<void | NotFoundException> {
    return this.taskRepository.toggleTask(id);
  }
}

const taskService = new TaskServiceImpl(taskRepository);
export default taskService;