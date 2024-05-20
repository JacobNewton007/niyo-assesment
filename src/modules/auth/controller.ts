import { Body, Controller, HttpCode, HttpStatus, Inject, NotFoundException, Post, Res } from "@nestjs/common";
import { AuthService, AuthServiceImpl } from "./services";
import { SkipAuth } from "./decorators/skip-auth.decorator";
import { LoginDto } from "./dtos/login.dto";
import { Response } from "express";
import { compareHash, hashString } from "../common/helper/string.helper";
import { JwtService } from "@nestjs/jwt";
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiTags } from "@nestjs/swagger";


@Controller('auth')
@ApiTags('Auth')
export class AuthController {

 constructor (
  @Inject(AuthServiceImpl) private readonly authService: AuthService,
  private readonly jwtService: JwtService,
  ) {}

  @SkipAuth()
  @Post('/login')
  @ApiBody({ type: LoginDto, description: 'Login', required: true, schema: {
    example: { email: 'a@a.com', password: '123456'}
  }})
  @ApiOkResponse({ type: LoginDto, description: 'Login', schema: {
    example: {
      message: 'Login Successful',
      status: 'success',
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY3NzI0NDM5MSwiZXhwIjoxNjc3MjQ0MzkxfQ.6sWnXKuW7hHw5k0wq7w9YU7KjOc6TmLQJ3O5Vt2V6a0',
        user: {
          id: '1',
          email: 'a@a.com'
        }
      }
    }
  }})
  async login(@Body() data: LoginDto, @Res() res: Response ) {
    const user = await this.authService.getUserByEmail(data.email);
    // check if user exists
    if (user instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: user.message,
        status: 'error',
        data: null 
      })
    }

    // check if password is correct
    const isValid = await compareHash(user.password, data.password)
    if (!isValid) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'Incorrect Password or Email',
        status: 'error',
        data: null 
      })
    }
    delete user.password;
    
    // generate token
    const token = await this.jwtService.sign(user)
    return res.status(HttpStatus.OK).json({
      message: 'Login Successful',
      status: 'success',
      data: {
        token,
        user
      }
    })
  } 
}