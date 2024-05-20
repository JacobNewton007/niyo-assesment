import { Inject, NotFoundException } from "@nestjs/common";
import { userEntity } from "./auth.type";
import { AuthRepository, AuthRepositoryImpl } from "./repositories";




export interface AuthService {

  getUserByEmail(email: string): Promise<userEntity | NotFoundException>;
}


export class AuthServiceImpl implements AuthService {
  constructor(
   @Inject(AuthRepositoryImpl) private readonly authRepository: AuthRepository
    ) {}

  public async getUserByEmail(email: string): Promise<userEntity | NotFoundException> {
    return this.authRepository.getUserByEmail(email);
  }

}