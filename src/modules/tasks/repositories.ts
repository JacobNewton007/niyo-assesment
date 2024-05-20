import { Inject, NotFoundException } from "@nestjs/common";
import { TaskEntity, TaskArgs, FilterTaskArg } from "./tasks.type";
import { DALImpl, DAL } from "../common/internal/postgres/dal";
import { userEntity } from "../auth/auth.type";
import { Paginate, PaginatorArgs } from "../common/helper/paginate";
import QueryBuilder from "../common/utils/query-builder";
import { dAL } from "../common/config/db";


export interface TaskRepository {

  create(arg: TaskArgs): Promise<TaskEntity | NotFoundException>;
  update(arg: Partial<TaskArgs>): Promise<TaskEntity | NotFoundException>;
  delete(id: string): Promise<void | NotFoundException>;
  getTasks(arg: FilterTaskArg): Promise<[TaskEntity[], PaginatorArgs]>;
  getTask(id: string): Promise<TaskEntity | NotFoundException>;
  toggleTask(id: string): Promise<void | NotFoundException>;
}



export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @Inject(DALImpl) private readonly dal: DAL
  ) {}



  public async create(arg: TaskArgs): Promise<TaskEntity | NotFoundException> {
    // check if the user creating the task exist
    arg.user_id = arg.userId
    const user = await this.dal.oneOrNone<userEntity>(`SELECT id  FROM users WHERE id = $1`, [arg.userId]);

    if (!user) {
      return new NotFoundException("User not found");
    }

    // create task

    return this.dal.oneOrNone<TaskEntity>(
    `
    INSERT INTO tasks (title, description, user_id) VALUES ($(title), $(description), $(user_id)) RETURNING *
    `, arg
    )
  }


  public async update(arg: Partial<TaskArgs>): Promise<TaskEntity | NotFoundException> {
    // check if the task exist

    console.log(arg, ">>>>Task")
    const task = await this.dal.oneOrNone<TaskEntity>(`SELECT id FROM tasks WHERE id = $1`, [arg.id]);
    if (!task) {
      return new NotFoundException("Task not found");
    }
    // update task
    return this.dal.oneOrNone<TaskEntity>(
      `
      UPDATE tasks 
      SET 
          title = COALESCE($(title), title),
          description = COALESCE($(description), description)      
          WHERE 
          id = $(id) 
      RETURNING *;
      `, {
      id: arg.id,
      title: arg.title || null,
      description: arg.description || null,
      }
      )
  }


  public async delete(id: string): Promise<void | NotFoundException> {
    // check if the task exist
    const task = await this.dal.oneOrNone<TaskEntity>(`SELECT id FROM tasks WHERE id = $1`, [id]);
    if (!task) {
      return new NotFoundException("Task not found");
    }
    // delete task
    await this.dal.none(`DELETE FROM tasks WHERE id = $1`, [id]);
  }




  public async getTasks(arg: FilterTaskArg): Promise<[TaskEntity[], PaginatorArgs]> {
    const { limit = 5, page = 1 } = arg;
    // get tasks
    const q = new QueryBuilder()
    q.select('*').from('tasks')
    .where('user_id = $(user_id)', {user_id: arg.userId})

    if (arg.status) {
      q.where('status = $(status)', {status: arg.status})
    }

    if (arg.startDate) {
      q.where('created_at >= $(startDate)', {startDate: arg.startDate})
    }

    if (arg.endDate) {
      q.where('created_at <= $(endDate)', {endDate: arg.endDate})
    }

    const result = await Paginate<TaskEntity>(
      'tasks',
      limit,
      page,
      q,
      this.dal
    )

    return result
  }


  public async getTask(id: string): Promise<TaskEntity | NotFoundException> {
    // get task
    console.log(id, ">>>>>>>")
    const task = await this.dal.oneOrNone<TaskEntity>(`SELECT * FROM tasks WHERE id = $1`, [id]);
    console.log(task, ">>>>>>>>>.")
    if (!task) {
      return new NotFoundException("Task not found");
    }
    return task
  }


  public async toggleTask(id: string): Promise<void | NotFoundException> {
    // check if the task exist
    const task = await this.dal.oneOrNone<TaskEntity>(`SELECT id FROM tasks WHERE id = $1`, [id]);
    if (!task) {
      return new NotFoundException("Task not found");
    }
    // toggle task
    await this.dal.none(`UPDATE tasks SET status = NOT status WHERE id = $1`, [id]);
  }
}


const taskRepository = new TaskRepositoryImpl(dAL);
export default taskRepository