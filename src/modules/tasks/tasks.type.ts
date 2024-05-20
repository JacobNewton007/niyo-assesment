import { userEntity } from "../auth/auth.type";


export class TaskEntity {
  id?: number;
  title: string;
  description: string;
  userId: string;
  user: Omit<userEntity, 'password' | 'created_at' | 'updated_at'>
  status: string;
  created_at?: Date;
  updated_at?: Date;
}


export type TaskArgs = {
  id?: string;
  title: string | null;
  description?: string | null;
  userId?: string;
  user_id?: string;
  status?: boolean;
}

export type FilterTaskArg = {
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  page?: number;
  userId?: string;
  status?: boolean;
}