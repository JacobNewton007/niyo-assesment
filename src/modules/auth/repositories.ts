import { DAL, DALImpl } from "../common/internal/postgres/dal";
import { userEntity } from "./auth.type";
import { Inject, NotFoundException } from "@nestjs/common";
import { dAL } from "../common/config/db";



export interface AuthRepository {
  // ...
  getUserByEmail(email: string): Promise<userEntity | NotFoundException>;
}




export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @Inject(DALImpl) private readonly dal: DAL
    ) {}
  // ...
  public async getUserByEmail(email: string): Promise<userEntity | NotFoundException> {
    const user = await this.dal.oneOrNone<userEntity>(`SELECT id, email, name, password FROM users WHERE email = $1`, [email]);
    if (!user) {
      return new NotFoundException("User not found");
    }
    return user
  }
}


const userRepository = new AuthRepositoryImpl(dAL);

export default userRepository